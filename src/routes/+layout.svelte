<script lang="ts">
	import { darkMode } from '../store';

	let isDarkMode = false;

	darkMode.subscribe((dm) => (isDarkMode = dm));

	function toggleDarkMode() {
		darkMode.set(!isDarkMode);
	}
</script>

<main class:dark-mode={isDarkMode}>
	<slot></slot>
	<button class="dark-mode-toggle btn" on:click={toggleDarkMode}>
		{#if isDarkMode}
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
					d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
				></path>
			</svg>
		{:else}
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
					d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
				></path>
			</svg>
		{/if}
	</button>
</main>

<style>
	@font-face {
		font-family: 'BioRhyme';
		src: url('/BioRhyme-VariableFont.ttf');
	}

	@font-face {
		font-family: 'Inter';
		src: url('/Inter-VariableFont.ttf');
	}

	* {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
	}

	main {
		font-family: 'Inter', sans-serif;
		padding: 2rem;
		height: 100vh;
		background-color: #fafaf9;
		transition:
			background-color 300ms,
			color 300ms;
	}

	main.dark-mode {
		background-color: #0c0a09;
		color: #fafaf9;
	}

	:global(button.btn) {
		padding: 0.5rem 0.9rem;
		font-size: 1rem;
		background-color: #d6d3d1;
		border: 0.12rem solid #292524;
		border-radius: 0.25rem;
		transition: background-color 150ms;
	}
	:global(button.btn:hover) {
		cursor: pointer;
		background-color: #a8a29e;
	}

	:global(button.btn.green) {
		background-color: #86efac;
	}
	:global(button.btn.green:hover) {
		background-color: #4ade80;
	}

	:global(button.btn.red) {
		background-color: #fca5a5;
	}
	:global(button.btn.red:hover) {
		background-color: #f87171;
	}

	button.dark-mode-toggle {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}

	main.dark-mode button.dark-mode-toggle {
		background-color: #292524;
		color: white;

		&:hover {
			background-color: #44403c;
		}
	}

	button.dark-mode-toggle svg {
		width: 1rem;
		height: 1rem;
		margin-bottom: -2px;
		margin-right: -4px;
		margin-left: -2px;
	}
</style>
