<script lang="ts">
	import { votes, revealed } from '../../store';

	let currentVotes: Vote[] = [];
	let isRevealed = false;

	votes.subscribe((v) => (currentVotes = v));
	revealed.subscribe((r) => (isRevealed = r));
</script>

{#if isRevealed}
	<ul>
		{#each currentVotes as vote}
			<li>{vote.name}: {vote.value}</li>
		{/each}
	</ul>
{:else}
	<p>Votes werden noch nicht angezeigt</p>
{/if}

<style>
	/* Style */
</style>
