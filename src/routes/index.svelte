<script lang='ts'>

	import { allPokemonRequest, pokemonQuery } from "../constants/api";
	import type { Pokemon } from "../types";

	let pokemons: Pokemon[] = []
	let search = ''

	let nextPage

	let loading = true

	const get = async (apiUrl: string) => {
		loading = true

		try {

			let res = await fetch(apiUrl)

			if (res.status === 200) {

				let data = await res.json()
			
					pokemons = [...data.pokemon]

					if (data.nextPage) {

						nextPage = data.nextPage
					
					} else { 
						nextPage = ''
					}

					loading = false

					return pokemons

			} else {
				console.error('Status !== 200')
			}

		} catch (error) { 
			console.error(error)
		}
	}

	get(allPokemonRequest)

	const handleChange = () => {

		if (search === '') { return get(allPokemonRequest) }

		if (search.length) { return get(pokemonQuery+search)}
	}

	const handleNextPage = async (searchTerm) => {




	}
	
</script>

<style>

	input {
		margin-bottom: 4em;
		background-color: var(--screen-colour);
		border: 3px solid var(--text-colour);
		border-radius: 3px;
		padding: .5em .3em;
	}

	input:focus {
		outline: none;
	}

	.next-page {
		display: grid;
		place-items: center;
	}
	
	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(125px, 1fr) );
		grid-gap: 1em;
	}
	
	.pokemon-grid-cell {
		border: 3px solid var(--text-colour);
		border-radius: 3px;
		padding: .5em;
		width: 100%;
		cursor: pointer;
		transition: .2s ease-in;
		color: var(--text-colour);
	}
	
	.pokemon-grid-cell:hover {
		background-color: var(--text-colour);
		color: var(--screen-colour);
	}

</style>

<h2>Please type a Pokemon name!</h2>
	
{#if loading}

<p>Loading...</p>

{:else} 

	<input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Search" on:input={handleChange} />

	<div class="pokemon-grid">

		{#each pokemons as pokemon}

			<a href={`/${pokemon.id}`} class="pokemon-grid-cell">

				<p><strong>Id:</strong> {pokemon.id}</p>
				<p><strong>Name:</strong> {pokemon.name}</p>
				<p><strong>Classification:</strong> {pokemon.classfication}</p>

			</a>

		{:else}

			<p>No Pokemon match that search.</p>

		{/each}

		{#if nextPage}

			<div class="pokemon-grid-cell next-page" >
				<p><strong>Next Page{nextPage}</strong></p>
			</div>
			MTE%3D

		{/if}

	</div>	

{/if}