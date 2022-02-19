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

}

</svelte:head>

<style>

	:global(:root) {
		--bg-colour: hsla(103, 33%, 71%, 0.8);
		--text-colour: hsla(130, 12%, 20%, 0.8);
		
		--d-grey: hsl(0, 0%, 41%);
	}

	:global(*) {
		box-sizing: border-box;
		font-family: sans-serif;
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
		te
	}

	.frame {
		background-color: var(--d-grey);
		position: fixed;
		inset: 0;
	}

	.light {
		border-radius: 50%;
		position: absolute;
		height: 1em;
		aspect-ratio: 1 /1 ;
		background-color: red;
		top: 30%;
		left: 2em;
		box-shadow:
    0 0 30px 8px #fff,
    0 0 30px 9px rgb(255, 0, 13),
    0 0 50px 10px rgb(255, 0, 13);
	}

</style>

<main>
	<div class="frame">
		<div class="light" />
		<small>battery</small>
		<slot />
	</div>
</main>