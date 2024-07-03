<script lang="ts">
	export let value: number | null;
	export let onClick: Function | null = null;
	export let disabled = false;
	export let compact = false;
	export let unrevealed = false;
	export let selected = false;

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

{#if value !== null}
	<button
		on:click={() => (onClick ? onClick(value) : undefined)}
		class:clickable={!!onClick}
		class:strong={value === -1}
		class:compact
		class:unrevealed
		class:selected
		{disabled}
	>
		{#if !unrevealed}
			<p class="small top">{mapNumber(value)}</p>
			<p>{mapNumber(value)}</p>
			<p class="small bottom">{mapNumber(value)}</p>
		{/if}
	</button>
{/if}

<style land="scss">
	button {
		--base-shadow: 0 0 0 0.12rem #151515;
		--selected-shadow: 0 0 0 0.36rem #22c55e;

		position: relative;
		width: 5rem;
		aspect-ratio: 2 / 3;
		background-color: var(--card-bg-color);
		border: solid 0.35rem white;
		border-radius: 0.5rem;
		box-shadow: var(--base-shadow);
		transition:
			scale 150ms ease-out,
			box-shadow 150ms;

		&.selected {
			box-shadow: var(--base-shadow), var(--selected-shadow);
		}

		&.unrevealed {
			background-color: #ffe4e6;
			opacity: 0.8;
			background-image: linear-gradient(
					30deg,
					#fb7185 12%,
					transparent 12.5%,
					transparent 87%,
					#fb7185 87.5%,
					#fb7185
				),
				linear-gradient(
					150deg,
					#fb7185 12%,
					transparent 12.5%,
					transparent 87%,
					#fb7185 87.5%,
					#fb7185
				),
				linear-gradient(
					30deg,
					#fb7185 12%,
					transparent 12.5%,
					transparent 87%,
					#fb7185 87.5%,
					#fb7185
				),
				linear-gradient(
					150deg,
					#fb7185 12%,
					transparent 12.5%,
					transparent 87%,
					#fb7185 87.5%,
					#fb7185
				),
				linear-gradient(
					60deg,
					#fb718577 25%,
					transparent 25.5%,
					transparent 75%,
					#fb718577 75%,
					#fb718577
				),
				linear-gradient(
					60deg,
					#fb718577 25%,
					transparent 25.5%,
					transparent 75%,
					#fb718577 75%,
					#fb718577
				);
			background-size: 16px 28px;
			background-position:
				0 0,
				0 0,
				8px 14px,
				8px 14px,
				0 0,
				8px 14px;
		}

		&.compact {
			width: 4rem;
		}

		&.clickable {
			&:not(:disabled) {
				cursor: pointer;
			}

			&:disabled {
				cursor: not-allowed;
			}

			&:hover:not(:disabled) {
				scale: 1.05;
			}
		}

		&.strong {
			background-color: var(--strong-card-bg-color);
		}
	}

	button p {
		margin: 0;
		font-size: 2.5rem;
		font-family: 'BioRhyme', sans-serif;
		z-index: 99;
	}

	button.compact p {
		font-size: 2rem;
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
