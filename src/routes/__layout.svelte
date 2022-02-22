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
		--screen-colour: hsl(103, 33%, 71%);
		--text-colour: hsla(130, 12%, 20%, 0.8);
		
		--d-grey: hsl(0, 0%, 41%);

		--basic-border: 3px solid var(--text-colour);
	}
	
	:global(*) {
		box-sizing: border-box;
		font-family: sans-serif;
		padding: 0;
		margin: 0;
	}
	
	:global(a,a:visited) {
		color: var(--text-colour)
	}

	:global(button) {
		display: block;
		border: var(--basic-border);
		border-radius: 3px;
		padding: .5em;
		color: var(--text-colour);
		background-color: var(--screen-colour);
		cursor: pointer;
		transition: 
			color .2s ease-in,
			background-color .2s ease-in
		;
	}

	:global(button:hover) {
		color: var(--screen-colour);
		background-color: var(--text-colour);
	}

	:global(body) {
		background-color: var(--bg-colour);
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
		margin-bottom: 3em;
	}
	
	:global(h3) {
		margin-bottom: .6em;
	}
	
	:global(main) {
		display: grid;
		place-items: center;
	}

	:global(p) {
		margin-bottom: .75em;
	}
	
	small {
		color: whitesmoke;
		font-variant: small-caps;
		letter-spacing: .08em;
	}

	:global(.basic-container) {
		border: var(--basic-border);
		border-radius: 3px;
		padding: .5em;
		color: var(--text-colour);
		background-color: var(--screen-colour);
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
		top: 10em;
		display: grid;
		place-items: center;
		grid-gap: 1em 0;
		width: fit-content;
		margin-left: 1em;
	}

	.lines {
		border-top: 3px solid hsl(300, 55%, 34%);
		border-bottom: 3px solid hsl(240, 54%, 34%);
		height: .75em;
		margin: 0 1.5em;
	}
	
	.screen {
		position:fixed;
		inset:0;
		background-color: var(--screen-colour);
		padding: 3em;
	}

	.top-decoration-container {
		position: relative;
		top: 1em;
	}

	.top-decoration-container small {
		position: absolute;
		top: 0;
		background-color: var(--d-grey);
		padding: 0 .75em;
		right: 12%;
	}
	
	@media screen and (min-width: 600px) {

		.screen {
			position: initial;
			background-color: var(--screen-colour);
			margin: 2em 6em;
			padding: 3em;
			border-radius: 6px;
		}

	}

</style>


<main>
	<div class="frame">
		<div class="top-decoration-container">
			<div class="lines" />
			<small>dot matrix with stereo sound</small>
		</div>
		
		<div class="light-container">
			<div class="light" />
			<small>battery</small>
		</div>
		
		<section class='screen'>
			<h1>Welcome to Poke-Picker</h1>

			<slot />

		</section>

	</div>
</main>