<script lang="ts">
	import { connectWebSocket, addVote, resetVotes, revealVotes } from '../store.js';
	import PokerCard from '../lib/components/PokerCard.svelte';
	import VotesDisplay from '../lib/components/VotesDisplay.svelte';
	import { onMount } from 'svelte';

	let name = '';
	let values = [1, 2, 3, 5, 8, 13, 20, 40];

	onMount(() => {
		const storedName = localStorage.getItem('username');
		if (storedName) {
			name = storedName;
		}

		connectWebSocket();
	});

	$: {
		if (name) {
			localStorage.setItem('username', name);
		}
	}
</script>

<main>
	<h1>Planning Poker</h1>
	<input type="text" bind:value={name} placeholder="Dein Name" />
	<div>
		{#each values as value}
			<PokerCard {value} onClick={() => addVote(name, value)} />
		{/each}
	</div>
	<button on:click={revealVotes}>Votes anzeigen</button>
	<button on:click={resetVotes}>Zurücksetzen</button>
	<VotesDisplay />
</main>

<style>
	/* Style */
</style>
