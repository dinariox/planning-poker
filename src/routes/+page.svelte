<script lang="ts">
	import { connectWebSocket, addVote, revealed, users, disconnectFromSocket } from '../store.js';
	import PokerCard from '../lib/components/PokerCard.svelte';
	import { onMount } from 'svelte';
	import PokerTable from '../lib/components/PokerTable.svelte';
	import ReferenceStories from '$lib/components/ReferenceStories.svelte';

	let name = '';
	let values = [0.5, 1, 2, 3, 5, 8, 13, 20, 40, -1];
	let isRevealed = false;
	let userVotes: User[] = [];
	let myVote: number | null = null;
	let windowHeight: number = 0;
	let copyrightYears = '2024';

	revealed.subscribe((r) => (isRevealed = r));
	users.subscribe((u) => {
		userVotes = u;
		myVote = getMyVote();
	});

	onMount(() => {
		windowHeight = window.innerHeight;
		const storedName = localStorage.getItem('username');
		if (storedName) {
			name = storedName;
			connectWebSocket(name);
		}

		window.onresize = () => {
			windowHeight = window.innerHeight;
		};

		const currentYear = new Date().getFullYear();
		if (currentYear !== 2024) {
			copyrightYears += `-${currentYear}`;
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
		disconnectFromSocket();
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

<svelte:head>
	<title>Planning Poker</title>
</svelte:head>

<main class="content">
	<div class="heading-container">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
			><path
				d="M14.7 2.2H16.2C17.3 2.2 18.2 3.1 18.2 4.2V10.6L14.7 2.2M20.1 3.8L21.4 4.4C22.4 4.8 22.9 6 22.5 7L20.1 12.9V3.8M18 15.5L13 3.5C12.7 2.7 12 2.3 11.2 2.3C10.9 2.3 10.7 2.4 10.4 2.5L3 5.5C2 5.9 1.5 7 2 8L7 20C7.3 20.8 8 21.2 8.8 21.2C9.1 21.2 9.3 21.2 9.6 21L17 18C17.8 17.7 18.2 17 18.2 16.2C18.1 16 18.1 15.7 18 15.5M11.4 15L8.2 12.6L8.6 8.6L11.8 11L11.4 15"
			/>
		</svg>
		<h1>Planning Poker</h1>
	</div>

	{#if !name}
		<p><b>Willkommen!</b> Bitte gib deinen Namen ein, um teilzunehmen.</p>
		<div class="name-input-container">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				id="name-input"
				value={name}
				placeholder="Dein Name"
				maxlength="15"
				autofocus
				on:keydown={handleKeydown}
			/>
			<button class="btn green" on:click={handleJoin}>Beitreten</button>
		</div>
	{:else}
		<div class="name-display-container">
			<p class="hello-text">Hallo <b>{name}</b></p>
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
		<PokerTable compact={windowHeight < 1000} />
		<div class="poker-cards">
			{#each values as value}
				<PokerCard
					{value}
					onClick={() => handleVote(name, value)}
					disabled={isRevealed}
					selected={myVote === value}
					compact={windowHeight < 1000}
				/>
			{/each}
		</div>
	{/if}
</main>
<ReferenceStories />
<p id="copyright">&#169; {copyrightYears} Timo Nowak</p>

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

		div.heading-container {
			display: flex;
			gap: 0.5rem;

			align-items: center;

			svg {
				height: 2.5rem;
			}
		}

		div.name-display-container {
			display: flex;
			align-items: center;

			margin-top: 0.5rem;

			p.hello-text {
				margin: 0;
			}
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

	#copyright {
		position: absolute;
		margin: 0;
		top: 1rem;
		right: 1rem;
		font-size: 0.8rem;
		opacity: 0.3;
	}
</style>
