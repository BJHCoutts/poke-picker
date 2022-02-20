<script lang='ts'>
	
	import { onMount } from "svelte";

	import { allPokemonRequest } from "../constants/api";
	import type { Pokemon } from "../types";

	let pokemons: Pokemon[] = []
	let search = ''

	export const get =  async (apiUrl: string) => {

		try {

			const res = await fetch(apiUrl)

			if (res.status === 200) {

				const data = await res.json()

				if (data.pokemon.length) {

					pokemons = data.pokemon

					return pokemons
				} else {
					console.error(`data.pokemons has no length`)
				}

			} else {
				console.error('Status !== 200')
			}

		} catch (error) { 
			console.error(error)
		}
	}
	
	const allPokemonPromise: Promise<{pokemon: Pokemon[]}> = get(allPokemonRequest)

	$: visiblePokemon = search ?
	pokemons.filter(pokemon => {
		return pokemon.name.match(`${search}.*`)
	}) : pokemons;
	
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

	
	{#await allPokemonPromise}
	
	<p>Loading...</p>
	
	{:then} 

		<input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Search" />
		
		{#each visiblePokemon as pokemon}

			<p>{pokemon.id}</p>
			<p>{pokemon.name}</p>
			<p>{pokemon.classfication}</p>

		{/each}

	{/await}

</section>