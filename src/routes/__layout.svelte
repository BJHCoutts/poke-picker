<svelte:head>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

	<style>
		@font-face {
			font-family: 'Pokemon Hollow';
			src: url('../fonts/pokemon-hollow.ttf') format('truetype');  
		}       
	</style>

</svelte:head>

<style>

	:global(:root) {
		--bg-colour: hsl(0, 0%, 70%);
		--screen-colour: hsla(103, 33%, 71%, 0.8);
		--text-colour: hsla(130, 12%, 20%, 0.8);
		
		--d-grey: hsl(0, 0%, 41%);
	}

	:global(*) {
		box-sizing: border-box;
		font-family: sans-serif;
		padding: 0;
		margin: 0;
	}

	:global(body) {
		background-color: var(--bg-colour);
	}
	
	:global(main) {
		display: grid;
		place-items: center;
	}
		
	:global(h1) {
		color: var(--text-colour);
		font-family: 'Pokemon Hollow';
		text-align: center;
		font-size: 2.5rem;
	}
	
	:global(h2) {
		color: var(--text-colour);
		font-family: 'Press Start 2P';
		text-align: center;
		font-size: 1rem;
	}

	small {
		color: whitesmoke;
		font-variant: small-caps;
		letter-spacing: .08em;
	}

	.frame {
		background-color: var(--d-grey);
		max-width: 1000px;
		position: relative;
		border-radius: 10px 10px 65px 10px;
	}

	.light {
		border-radius: 50%;
		height: 1em;
		aspect-ratio: 1 /1 ;
		background-color: red;
		box-shadow:
    0 0 30px 8px #fff,
    0 0 30px 9px rgb(255, 0, 13),
    0 0 50px 10px rgb(255, 0, 13);
	}
	
	.light-container {
		position: absolute;
		top: 30%;
		display: grid;
		place-items: center;
		grid-gap: 1em 0;
		width: fit-content;
		margin-left: 1em;
	}

</style>

<main>
	<div class="frame">
		<small>dot matrix with stereo sound</small>

		<div class="light-container">
			<div class="light" />
			<small>battery</small>
		</div>

		<slot />

	</div>
</main>