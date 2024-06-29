<script lang="ts">
	import { connectWebSocket, addVote, resetVotes, revealVotes, revealed } from '../store.js';
	import PokerCard from '../lib/components/PokerCard.svelte';
	import VotesDisplay from '../lib/components/VotesDisplay.svelte';
	import { onMount } from 'svelte';

	let name = '';
	let values = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, -1];
	let isRevealed = false;

	revealed.subscribe((r) => (isRevealed = r));

	onMount(() => {
		const storedName = localStorage.getItem('username');
		if (storedName) {
			name = storedName;
			connectWebSocket(name);
		}
	});

	$: {
		if (name) {
			localStorage.setItem('username', name);
		}
	}

	function handleJoin() {
		const elem = document.getElementById('name-input');
		if (elem instanceof HTMLInputElement) {
			if (elem.value) {
				name = elem.value;
			} else {
				alert('Bitte gib einen Namen ein!');
			}
		}

		if (name) {
			connectWebSocket(name);
		}
	}

	function handleChangeName() {
		localStorage.removeItem('username');
		name = '';
	}
</script>

<main class="content">
	<h1>Planning Poker</h1>

	{#if !name}
		<input type="text" id="name-input" value={name} placeholder="Dein Name" />
		<button class="btn" on:click={handleJoin}>Beitreten</button>
	{:else}
		<h2>Hallo {name}</h2>
		<button class="btn" on:click={handleChangeName}>Namen ändern</button>
		<VotesDisplay />
		<div class="poker-cards">
			{#each values as value}
				<PokerCard {value} onClick={() => addVote(name, value)} disabled={isRevealed} />
			{/each}
		</div>
		<button class="btn green" on:click={revealVotes}>Votes anzeigen</button>
		<button class="btn red" on:click={resetVotes}>Zurücksetzen</button>
	{/if}
</main>

<style lang="scss">
	main.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-shrink: 1;
		align-items: center;

		h1 {
			margin: 0;
		}

		.poker-cards {
			margin: 1rem 0;
			display: flex;
			gap: 1rem;
		}
	}
</style>
