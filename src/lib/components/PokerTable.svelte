<script lang="ts">
	import { revealed, revealVotes, resetVotes, users } from '../../store';
	import PokerCard from './PokerCard.svelte';

	export let compact = false;

	let isRevealed = false;
	let userList: User[] = [];
	let average: number = 0;

	revealed.subscribe((r) => (isRevealed = r));
	users.subscribe((u) => {
		userList = u;
		calculateAverage();
	});

	function calculateAverage() {
		const usersWithVotes = userList.filter((user) => user.vote !== null && user.vote !== -1);
		const totalVotes = usersWithVotes.reduce((sum, user) => sum + user.vote!, 0);
		average = usersWithVotes.length > 0 ? totalVotes / usersWithVotes.length : 0;
	}
</script>

<div class="poker-table-container">
	<div class="poker-table" class:compact>
		<div class="users">
			{#each userList as user}
				<div class="user">{user.name}</div>
			{/each}
		</div>
		<div class="vote-cards">
			{#each userList as user}
				<div class="vote-card">
					<PokerCard compact value={user.vote} unrevealed={!isRevealed} />
				</div>
			{/each}
		</div>
		{#if isRevealed}
			<p class="average">Ø <span>{Math.round(average * 10) / 10}</span></p>
		{/if}
		<div class="action-buttons">
			<button class="green" on:click={revealVotes}>Aufdecken</button>
			<button class="red" on:click={resetVotes}>Zurücksetzen</button>
		</div>
	</div>
</div>

<style lang="scss">
	div.poker-table-container {
		height: 100%;
		padding: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;

		div.poker-table {
			height: 80%;
			aspect-ratio: 3/2;
			background-color: var(--poker-table-color);
			border-radius: 9999px;
			border: 1.5rem solid var(--poker-table-border-color);
			box-shadow:
				0.25rem 0.25rem 0.6rem rgba(0, 0, 0, 0.4),
				inset 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
			position: relative;
			transition:
				background-color 300ms,
				border 300ms;

			&.compact {
				border: 1.2rem solid var(--poker-table-border-color);
			}

			div.user {
				position: absolute;
				font-weight: 600;
				letter-spacing: 1px;
				padding: 0.5rem 0.75rem;
				background-color: var(--username-bg-color);
				border-radius: 0.25rem;
				box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
				color: white;
				transition: background-color 300ms;
				animation: fade-in 300ms ease-out;

				&:nth-of-type(1) {
					top: 12%;
					left: 4%;
					transform: translate(-100%, -100%);
				}
				&:nth-of-type(2) {
					top: -14%;
					left: 25%;
					transform: translateX(-50%);
				}
				&:nth-of-type(3) {
					top: -14%;
					left: 50%;
					transform: translateX(-50%);
				}
				&:nth-of-type(4) {
					top: -14%;
					left: 75%;
					transform: translateX(-50%);
				}
				&:nth-of-type(5) {
					top: 12%;
					left: 96%;
					transform: translateY(-100%);
				}
				&:nth-of-type(6) {
					top: 50%;
					transform: translateY(-50%);
					left: 105%;
				}
				&:nth-of-type(7) {
					top: 88%;
					left: 96%;
				}
				&:nth-of-type(8) {
					bottom: -14%;
					left: 75%;
					transform: translateX(-50%);
				}
				&:nth-of-type(9) {
					bottom: -14%;
					left: 50%;
					transform: translateX(-50%);
				}
				&:nth-of-type(10) {
					bottom: -14%;
					left: 25%;
					transform: translateX(-50%);
				}
				&:nth-of-type(11) {
					top: 88%;
					left: 4%;
					transform: translateX(-100%);
				}
				&:nth-of-type(12) {
					top: 50%;
					transform: translate(-100%, -50%);
					left: -5%;
				}
			}

			div.vote-card {
				position: absolute;
				translate: -50%;

				&:nth-of-type(1) {
					top: 15%;
					left: 15%;
				}
				&:nth-of-type(2) {
					top: 4%;
					left: 30%;
				}
				&:nth-of-type(3) {
					top: 4%;
					left: 50%;
				}
				&:nth-of-type(4) {
					top: 4%;
					left: 70%;
				}
				&:nth-of-type(5) {
					top: 15%;
					left: 85%;
				}
				&:nth-of-type(6) {
					top: 50%;
					transform: translateY(-50%);
					left: 94%;
				}
				&:nth-of-type(7) {
					bottom: 15%;
					left: 85%;
				}
				&:nth-of-type(8) {
					bottom: 5%;
					left: 70%;
				}
				&:nth-of-type(9) {
					bottom: 5%;
					left: 50%;
				}
				&:nth-of-type(10) {
					bottom: 5%;
					left: 30%;
				}
				&:nth-of-type(11) {
					bottom: 15%;
					left: 15%;
				}
				&:nth-of-type(12) {
					top: 50%;
					transform: translateY(-50%);
					left: 6%;
				}
			}

			p.average {
				margin: 0;
				position: absolute;
				top: 50%;
				left: 50%;
				translate: -50% -50%;
				font-size: 1.25rem;
				font-family: 'BioRhyme';
				color: var(--average-fg-color);
				animation: fade-in 300ms ease-out;

				span {
					font-size: 2.5rem;
				}
			}

			div.action-buttons {
				display: flex;
				gap: 0.5rem;
				position: absolute;
				bottom: 30%;
				left: 50%;
				translate: -50%;

				button {
					background-color: transparent;
					border: 0.15rem solid;
					border-radius: 0.25rem;
					padding: 0.25rem 0.5rem;
					font-size: 1rem;
					font-family: 'Inter', sans-serif;
					cursor: pointer;
					transition:
						border-color 150ms,
						color 150ms;

					&.green {
						border-color: var(--button-green-bg-color);
						color: var(--button-green-bg-color);

						&:hover {
							border-color: var(--button-green-hover-color);
							color: var(--button-green-hover-color);
						}
					}

					&.red {
						border-color: var(--button-red-bg-color);
						color: var(--button-red-bg-color);

						&:hover {
							border-color: var(--button-red-hover-color);
							color: var(--button-red-hover-color);
						}
					}
				}
			}
		}
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
