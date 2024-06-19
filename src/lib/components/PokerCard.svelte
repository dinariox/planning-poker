<script lang="ts">
	export let value;
	export let onClick;
</script>

<button on:click={() => onClick(value)}>
	{value}
</button>

<style>
	button {
		/* Style */
	}
</style>
