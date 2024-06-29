<script lang="ts">
	import { votes, revealed, activeUsers } from '../../store';
	import PokerCard from './PokerCard.svelte';

	let currentVotes: Vote[] = [];
	let isRevealed = false;
	let users: string[] = [];

	votes.subscribe((v) => (currentVotes = v));
	revealed.subscribe((r) => (isRevealed = r));
	activeUsers.subscribe((au) => (users = au));
</script>

<main>
	<div class="active-users">
		<h3>Aktive Nutzer</h3>
		<ul>
			{#each users as user}
				<li>{user}</li>
			{/each}
		</ul>
	</div>
	{#if isRevealed}
		<ul>
			{#each currentVotes as vote}
				<li>{vote.name}: <PokerCard value={vote.value} /></li>
			{/each}
		</ul>
	{:else}
		<p>Votes werden noch nicht angezeigt</p>
	{/if}

	<div class="poker-table"></div>
</main>

<style>
	div.poker-table {
		width: 50%;
		aspect-ratio: 3/2;
		background-color: #15803d;
		border-radius: 9999px;
		border: 1.5rem solid #fbbf24;
		box-shadow:
			0.25rem 0.25rem 0.6rem rgba(0, 0, 0, 0.4),
			inset 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
	}
</style>
