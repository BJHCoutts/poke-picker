<script lang='ts'>

	import { addChaos, addFlakey, allPokemonRequest, pokemonQuery } from "../constants/api";
	import type { Pokemon } from "../types";

	let pokemons: Pokemon[] = []
	let search = ''

	let loading = true
	let endOfList = false

	let error

	const get = async (apiUrl: string) => {
		loading = true

		try {

			let res = await fetch(apiUrl)

			if (res.status === 200) {

				let data = await res.json()
			
					pokemons = [...data.pokemon]

					if (data.nextPage && data.nextPage !== 'undefined') {

						const getAdditionalPages = async (nextPage) => {
	
							let additionalPageRes = await fetch(`${apiUrl}/?page=${nextPage}`)

							if (additionalPageRes.status === 200) {

								let additionalPageData = await additionalPageRes.json()
		
								pokemons = [...pokemons, ...additionalPageData.pokemon]
	
								if (additionalPageData.nextPage && additionalPageData.nextPage !== 'undefined') {
	
									getAdditionalPages(additionalPageData.nextPage)
								} else { 
									loading = false
									endOfList = true
								}

							} else {

								loading = false
								console.error('Status !== 200')
								error = 'The server response status !== 200, Please click here to reload'

							}
	
						}

						getAdditionalPages(data.nextPage)

					} 
					else { 
						loading = false
						endOfList = true
					}

					loading = false

					return pokemons

			} else {

				loading = false
				console.error('Status !== 200')
				error = 'The server response status !== 200, Please click here to reload'
			}

		} catch (error) { 
			console.error(error)
		}
	}

	get(allPokemonRequest+addFlakey)

	let debounceTimer

	const handleChange = () => {

		clearTimeout(debounceTimer)
		
		debounceTimer = setTimeout( () => {

			if (search === '') { return get(allPokemonRequest) }

			if (search.length) { return get(pokemonQuery+search)}

		}, 2000)

	}

	const handleReload = () => {
		error = false
		get(allPokemonRequest)
	}
	
</script>

<style>

	button {
		margin: 0 auto 2em;
	}

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
		transition: 
			color .2s ease-in,
			background-color .2s ease-in
		;
	}
	
	a.pokemon-grid-cell:hover {
		background-color: var(--text-colour);
		color: var(--screen-colour);
	}

</style>

<h2>Please type a Pokemon name!</h2>
	
{#if loading}

	<p>Loading...</p>

{:else if error}

	<p>{error}</p>

	<button on:click={handleReload}>Reload</button>

	{#if pokemons.length}
	
	<p>This is what was loaded before the server error:</p>

		<div class="pokemon-grid">

			{#each pokemons.sort((a,b) => a.id - b.id) as pokemon}

				<a href={`/${pokemon.id}`} class="pokemon-grid-cell basic-container">

					<p><strong>Id:</strong> {pokemon.id}</p>
					<p><strong>Name:</strong> {pokemon.name}</p>
					<p><strong>Classification:</strong> {pokemon.classfication}</p>

				</a>

			{:else}

				<p>No Pokemon match that search. You didn't catch them all.</p>

			{/each}

				<div class="pokemon-grid-cell basic-container" >
					<p><strong>There was server error before we could load any more...</strong></p>
				</div>

		</div>
	{/if}

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