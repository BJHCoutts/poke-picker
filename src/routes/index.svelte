<script lang='ts'>

	import { allPokemonRequest } from "../constants/api";
	import type { Pokemon } from "../types";

	import { get } from "../utils/get";

	const allPokemonPromise: Promise<{pokemon: Pokemon[]}> = get(allPokemonRequest)
	
</script>

<style>

	input {
		margin-bottom: 4em;
		border: 3px solid var(--text-colour);
		background-color: var(--screen-colour);
		border-radius: 3px;
		padding: .5em .3em;
	}

	input:focus {
		outline: none;
	}

	.screen {
		background-color: var(--screen-colour);
		margin: 2em 6em;
		padding: 3em;
		border-radius: 6px;
	}

</style>

<section class='screen'>
	<h1>Welcome to Poke-Picker</h1>
	<h2>Please type a Pokemon name!</h2>
	<input type="text">

	{#await allPokemonPromise}

		<p>Loading...</p>

	{:then pokemons} 
		
		{#each pokemons.pokemon as pokemon}

			<p>{pokemon.id}</p>
			<p>{pokemon.name}</p>
			<p>{pokemon.classfication}</p>

		{/each}

	{/await}

</section>