<script lang="ts">
	import { connectWebSocket, addVote, resetVotes, revealVotes, revealed, users } from '../store.js';
	import PokerCard from '../lib/components/PokerCard.svelte';
	import { onMount } from 'svelte';
	import PokerTable from '../lib/components/PokerTable.svelte';

	let name = '';
	let values = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, -1];
	let isRevealed = false;
	let userVotes: User[] = [];
	let myVote: number | null = null;

	revealed.subscribe((r) => (isRevealed = r));
	users.subscribe((u) => {
		userVotes = u;
		myVote = getMyVote();
	});

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
			location.reload();
		}
	}

	function handleChangeName() {
		localStorage.removeItem('username');
		name = '';
	}

	function handleVote(name: string, value: number) {
		addVote(name, value);
		myVote = value;
	}

	function getMyVote() {
		return userVotes.find((u) => u.name === name)?.vote ?? null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleJoin();
		}
	}
</script>

<main class="content">
	<h1>Planning Poker</h1>

	{#if !name}
		<p><b>Willkommen!</b> Bitte gib deinen Namen ein, um teilzunehmen.</p>
		<div class="name-input-container">
			<input
				type="text"
				id="name-input"
				value={name}
				placeholder="Dein Name"
				maxlength="15"
				on:keydown={handleKeydown}
			/>
			<button class="btn green" on:click={handleJoin}>Beitreten</button>
		</div>
	{:else}
		<div class="name-display-container">
			<p>Hallo <b>{name}</b></p>
			<button class="edit-btn" on:click={handleChangeName}>
				<svg
					data-slot="icon"
					fill="none"
					stroke-width="1.5"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					></path>
				</svg>
			</button>
		</div>
		<PokerTable />
		<div class="poker-cards">
			{#each values as value}
				<PokerCard
					{value}
					onClick={() => handleVote(name, value)}
					disabled={isRevealed}
					selected={myVote === value}
				/>
			{/each}
		</div>
		<div class="action-buttons">
			<button class="btn green" on:click={revealVotes}>Votes anzeigen</button>
			<button class="btn red" on:click={resetVotes}>Zurücksetzen</button>
		</div>
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

		div.action-buttons {
			display: flex;
			gap: 0.5rem;
			margin-top: 0.5rem;
		}

		button.edit-btn {
			background-color: transparent;
			border: none;
			color: var(--fg-color);
			transition: color 150ms;

			&:hover {
				color: var(--button-red-hover-color);
				cursor: pointer;
			}

			svg {
				width: 1.25rem;
			}
		}

		div.name-display-container {
			display: flex;
			align-items: center;
		}

		div.name-input-container {
			display: flex;
			gap: 0.5rem;
			margin-top: 0.5rem;
		}

		input#name-input {
			width: 10rem;
			padding: 0.5rem;
			font-size: 1rem;
			border: 0.12rem solid #292524;
			border-radius: 0.25rem;
		}
	}
</style>
