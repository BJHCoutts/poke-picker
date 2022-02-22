<script lang='ts'>

	import ReloadOptions from "../components/indexPage/ReloadOptions.svelte";
import { allPokemonRequest, pokemonQuery } from "../constants/api";
	import { endOfList, error, loading, pokemons } from "../stores/pokemonStore";
	import { catchThemAll } from "../utils/catchEmAll";

	let search = ''

	catchThemAll(allPokemonRequest)

	let debounceTimer

	const handleChange = () => {

		clearTimeout(debounceTimer)
		
		debounceTimer = setTimeout( () => {

			if (search === '') { return catchThemAll(allPokemonRequest) }

			if (search.length) { return catchThemAll(pokemonQuery+search)}

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

	li {list-style-type: none;}
	
	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(125px, 1fr) );
		grid-gap: 1em;
	}

	.error-container {
		margin-bottom: 2em;
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

<ReloadOptions />

<h2>Please type a Pokemon name!</h2>
	
{#if $loading}

	<p>Loading...</p>

{:else if $error}

	<div class="error-container">
		<p>{$error}</p>
		<p>Please use a reload button above</p>
	</div>

	{#if $pokemons.length}
	
	<p>This is what was loaded before the server error:</p>

		<div class="pokemon-grid">

			{#each $pokemons.sort((a,b) => a.id - b.id) as pokemon}

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

	<input type="search" bind:value={search} on:input={handleChange} />

	<ul class="pokemon-grid">

		{#each $pokemons as pokemon}

			<a href={`/${pokemon.id}`} class="pokemon-grid-cell basic-container">

				<li>
					<p><strong>Id:</strong> {pokemon.id}</p>
					<p><strong>Name:</strong> {pokemon.name}</p>
					<p><strong>Classification:</strong> {pokemon.classfication}</p>
				</li>

			</a>

		{:else}

			<p>No Pokemon match that search. You didn't catch them all.</p>

		{/each}

		{#if $endOfList}

			<div class="pokemon-grid-cell basic-container" >
				<p><strong>You caught them all. End of list.</strong></p>
			</div>
			
			{:else}

			<div class="pokemon-grid-cell basic-container" >
				<p><strong>Loading more pages...</strong></p>
			</div>

		{/if}

		</ul>	

{/if}