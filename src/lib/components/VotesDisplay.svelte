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

<style>
	/* Style */
</style>
