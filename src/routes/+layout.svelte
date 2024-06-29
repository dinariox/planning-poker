<script lang="ts"></script>

<main>
	<slot></slot>
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
</style>
