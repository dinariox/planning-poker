<script lang="ts">
	import { addVote, resetVotes, revealVotes } from '../store.js';
	import PokerCard from '../lib/components/PokerCard.svelte';
	import VotesDisplay from '../lib/components/VotesDisplay.svelte';

	let name = '';
	let values = [1, 2, 3, 5, 8, 13, 20, 40];
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
