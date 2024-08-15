<script lang="ts">
	let open = false;
</script>

<button
	id="reference-stories-btn"
	class="btn"
	on:click={() => {
		open = !open;
	}}>Referenz-Stories</button
>

<div id="reference-stories-popover" class:open>
	<h2>Referenz-Stories</h2>
	<button id="close-btn">
		<svg
			data-slot="icon"
			fill="none"
			stroke-width="1.5"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
		</svg>
	</button>
	<div id="reference-stories-container">
		<div class="reference-stories-column">
			<p>0.5</p>
			<div class="reference-story-card">
				<p>Pipeline um Logs von AWS zu lesen</p>
			</div>
		</div>
		<div class="reference-stories-column">
			<p>1</p>
			<div class="reference-story-card">
				<p>Elasticsearch Schema erweitern</p>
			</div>
			<div class="reference-story-card">
				<p>IDA-Projekt anlegen</p>
			</div>
		</div>
		<div class="reference-stories-column">
			<p>2</p>
			<div class="reference-story-card">
				<p>ADR ausarbeiten + dokumentieren</p>
			</div>
			<div class="reference-story-card">
				<p>Einfache Backend-Route anlegen</p>
			</div>
			<div class="reference-story-card">
				<p>Im Frontend einen Share-Button implementieren, der einen Dialog öffnet</p>
			</div>
		</div>
		<div class="reference-stories-column">
			<p>3</p>
			<div class="reference-story-card">
				<p>Dummy-Lambda nutzen um eigene Funktion zu implementieren</p>
			</div>
			<div class="reference-story-card">
				<p>Catwalk Worker implementieren</p>
			</div>
			<div class="reference-story-card">
				<p>Modell in DEV/IAT mit CamMock testen</p>
			</div>
		</div>
		<div class="reference-stories-column">
			<p>5</p>
			<div class="reference-story-card">
				<p>Modell retrainieren und auf Testsets evaluieren</p>
			</div>
			<div class="reference-story-card">
				<p>Casbin Migration</p>
			</div>
			<div class="reference-story-card">
				<p>PDF-Generierung im Frontend implementieren</p>
			</div>
		</div>
		<div class="reference-stories-column">
			<p>8</p>
			<div class="reference-story-card">
				<p>Neue abgesicherte API mit Persistenzanbindung</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	#reference-stories-btn {
		position: absolute;
		top: 1rem;
		left: 4rem;
	}

	#reference-stories-popover {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		background-color: color-mix(in srgb, var(--bg-color) 70%, transparent);
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0.25rem 0.25rem 0.6rem rgba(0, 0, 0, 0.4);

		&.open {
			display: block;
		}

		h2 {
			margin-top: 0;
			margin-bottom: 2rem;
			text-align: center;
		}

		#close-btn {
			position: absolute;
			top: 0.75rem;
			right: 0.75rem;
			background-color: transparent;
			border: none;
			cursor: pointer;
			color: var(--fg-color);
			width: 2.25rem;
			height: 2.25rem;
		}

		#reference-stories-container {
			display: flex;
			gap: 0.75rem;

			.reference-stories-column {
				display: flex;
				gap: 0.75rem;
				flex-direction: column;

				> p {
					color: var(--fg-color);
					font-size: 1.25rem;
					font-weight: bold;
					text-align: center;
					margin: 0;
				}

				.reference-story-card {
					background-color: var(--card-bg-color);
					color: black;
					padding: 0.75rem;
					border-radius: 0.5rem;
					box-shadow: 0.15rem 0.15rem 0.4rem rgba(0, 0, 0, 0.25);

					p {
						margin: 0;
					}
				}
			}
		}
	}
</style>
