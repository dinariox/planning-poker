<script lang="ts">
	export let value;
	export let onClick: Function | null = null;
	export let disabled = false;

	function mapNumber(number: number): string {
		switch (number) {
			case -1:
				return '?';
			case 0.5:
				return '½';
			default:
				return number.toString();
		}
	}
</script>

<button
	on:click={() => (onClick ? onClick(value) : undefined)}
	class:clickable={!!onClick}
	class:strong={value === -1}
	{disabled}
>
	<p class="small top">{mapNumber(value)}</p>
	<p>{mapNumber(value)}</p>
	<p class="small bottom">{mapNumber(value)}</p>
</button>

<style>
	@font-face {
		font-family: 'BioRhyme';
		src: url('/BioRhyme-VariableFont.ttf');
	}

	button {
		position: relative;
		width: 5rem;
		aspect-ratio: 2 / 3;
		background-color: #fef3c7;
		border: solid 0.35rem white;
		border-radius: 0.5rem;
		box-shadow: 0 0 0 0.12rem #151515;
		transition: scale 150ms ease-out;
	}

	button.clickable:not(:disabled) {
		cursor: pointer;
	}

	button.clickable:disabled {
		cursor: not-allowed;
	}

	button.clickable:hover:not(:disabled) {
		scale: 1.05;
	}

	button.strong {
		background-color: #fcd34d;
	}

	button p {
		margin: 0;
		font-size: 2.5rem;
		font-family: 'BioRhyme', sans-serif;
		z-index: 99;
	}

	button.strong p {
		color: white;
	}

	button.strong:disabled p {
		opacity: 75%;
	}

	button p.small {
		font-size: 0.85rem;
		position: absolute;
	}

	button p.small.top {
		left: 0.35rem;
		top: 0.25rem;
	}

	button p.small.bottom {
		right: 0.35rem;
		bottom: 0.25rem;
	}
</style>
