<script lang="ts">
	import { onMount } from 'svelte';
	import { darkMode } from '../store';

	let isDarkMode: boolean = false;

	onMount(() => {
		isDarkMode = localStorage.getItem('darkmode') === 'true';
		darkMode.set(isDarkMode);
		darkMode.subscribe((dm) => (isDarkMode = dm));
	});

	function toggleDarkMode() {
		darkMode.set(!isDarkMode);
		localStorage.setItem('darkmode', String(isDarkMode));
	}
</script>

<main class:dark-mode={isDarkMode}>
	<slot></slot>
	<button
		class="dark-mode-toggle btn"
		on:click={toggleDarkMode}
		title={`Zu ${isDarkMode ? 'hellem' : 'dunklem'} Design wechseln`}
	>
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
		--bg-color: #fafaf9;
		--fg-color: #0c0a09;
		--button-bg-color: #d6d3d1;
		--button-fg-color: black;
		--button-hover-color: #a8a29e;
		--button-red-bg-color: #f87171;
		--button-red-hover-color: #ef4444;
		--button-green-bg-color: #4ade80;
		--button-green-hover-color: #22c55e;
		--card-bg-color: #fef3c7;
		--strong-card-bg-color: #fcd34d;
		--poker-table-color: #15803d;
		--poker-table-border-color: #fbbf24;
		--username-bg-color: #15803d;
		--average-fg-color: #86efac;

		/* TODO: Card colors */
		font-family: 'Inter', sans-serif;
		padding: 1.5rem 2rem 0.5rem 2rem;
		height: 100vh;
		background-color: var(--bg-color);
		color: var(--fg-color);
		transition:
			background-color 300ms,
			color 300ms;
	}

	main.dark-mode {
		--bg-color: #0c0a09;
		--fg-color: #fafaf9;
		--button-bg-color: #57534e;
		--button-fg-color: white;
		--button-hover-color: #78716c;
		--button-red-bg-color: #ef4444;
		--button-red-hover-color: #f87171;
		--button-green-bg-color: #22c55e;
		--button-green-hover-color: #4ade80;
		--card-bg-color: #fde68a;
		--strong-card-bg-color: #fcd34d;
		--poker-table-color: #166534;
		--poker-table-border-color: #c9981c;
		--username-bg-color: #166534;
		--average-fg-color: #86efac;
	}

	:global(input[type='text']) {
		font-family: 'Inter', sans-serif;
		font-weight: 500;
	}

	:global(button.btn) {
		padding: 0.5rem 0.9rem;
		font-size: 1rem;
		background-color: var(--button-bg-color);
		color: var(--button-fg-color);
		border: 0.12rem solid #292524;
		border-radius: 0.25rem;
		transition:
			background-color 150ms,
			color 150ms;
	}
	:global(button.btn:hover) {
		cursor: pointer;
		background-color: var(--button-hover-color);
	}

	button.dark-mode-toggle {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}

	button.dark-mode-toggle svg {
		width: 1rem;
		height: 1rem;
		margin-bottom: -2px;
		margin-right: -4px;
		margin-left: -2px;
	}
</style>
