<script lang='ts'>

	console.log('layout')

</script>

<svelte:head>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

</svelte:head>

<style>

	:global(*) {
		box-sizing: border-box;
		font-family: sans-serif;
	}

	:global(body) {
		background-color: rgba(197, 216, 194, 0.8);
	}

	:global(h1) {
		font-family: 'Press Start 2P';
		color: rgba(46, 58, 48, 0.8);
		text-align: center;
	}

	main {
		padding: 3em 4em;
	}

</style>

<main>

	<slot />

</main>