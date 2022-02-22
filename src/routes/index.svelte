<script lang='ts'>

	import { allPokemonRequest, pokemonQuery } from "../constants/api";
	import type { Pokemon } from "../types";

	let pokemons: Pokemon[] = []
	let search = ''

	let loading = true
	let endOfList = false

	const get = async (apiUrl: string) => {
		loading = true

		try {

			let res = await fetch(apiUrl)

			if (res.status === 200) {

				let data = await res.json()
			
					pokemons = [...data.pokemon]

					if (data.nextPage && data.nextPage != 'undefined') {

						const getAdditionalPages = async (nextPage) => {
	
							res = await fetch(`${apiUrl}/?page=${nextPage}`)
	
							data = await res.json()
	
							pokemons = [...pokemons, ...data.pokemon]

							if (data.nextPage && data.nextPage !== 'undefined') {

								getAdditionalPages(data.nextPage)
							} 
							else { endOfList = true}
						}

						getAdditionalPages(data.nextPage)

					} 
					else { endOfList = true}


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

	let debounceTimer

	const handleChange = () => {

		clearTimeout(debounceTimer)
		
		debounceTimer = setTimeout( () => {

			if (search === '') { return get(allPokemonRequest) }

			if (search.length) { return get(pokemonQuery+search)}

		}, 2000)

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

	}
	
	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(125px, 1fr) );
		grid-gap: 1em;
	}
	
	.pokemon-grid-cell {
		width: 100%;
		display: grid;
		place-items: center;
	}

	a.pokemon-grid-cell {
		cursor: pointer;
		transition: .2s ease-in;
	}
	
	a.pokemon-grid-cell:hover {
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

			<a href={`/${pokemon.id}`} class="pokemon-grid-cell basic-container">

				<p><strong>Id:</strong> {pokemon.id}</p>
				<p><strong>Name:</strong> {pokemon.name}</p>
				<p><strong>Classification:</strong> {pokemon.classfication}</p>

			</a>

		{:else}

			<p>No Pokemon match that search. You didn't catch them all.</p>

		{/each}

		{#if endOfList}

			<div class="pokemon-grid-cell basic-container" >
				<p><strong>End of List</strong></p>
			</div>
			
			{:else}

			<div class="pokemon-grid-cell basic-container" >
				<p><strong>Loading more pages...</strong></p>
			</div>

		{/if}

	</div>	

{/if}