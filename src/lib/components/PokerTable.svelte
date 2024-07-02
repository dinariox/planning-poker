<script lang="ts">
	import { revealed, users } from '../../store';
	import PokerCard from './PokerCard.svelte';

	let isRevealed = false;
	let userList: User[] = [];

	revealed.subscribe((r) => (isRevealed = r));
	users.subscribe((u) => (userList = u));
</script>

<div class="poker-table-container">
	<div class="poker-table">
		<div class="users">
			{#each userList as user}
				<div class="user">{user.name}</div>
			{/each}
		</div>
		<div class="vote-cards">
			{#each userList as user}
				<div class="vote-card">
					<PokerCard compact={true} value={user.vote} unrevealed={!isRevealed} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	div.poker-table-container {
		height: 100%;
		padding: 2rem;
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
		}
	}
</style>
