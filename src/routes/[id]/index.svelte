<script context="module" lang='ts'>

	import type { LoadInput } from '@sveltejs/kit';
	import { allPokemonRequest } from '../../constants/api';

	export const load = async ({params}: LoadInput) => {

		let id = params.id

		return { props: { id } }
	} 

</script>

<script lang="ts">

	import { get } from '../../utils/get'

	export let id

	const pokemonDetailsPromise = get(`${allPokemonRequest}/${id}`)

</script>

<style>

	li {
		list-style-type: none;
	}

	ul {
		margin-bottom: 1em;
	}

</style>

<a href="/">{`<=`} Back to main search</a>

{#await pokemonDetailsPromise}

	<p>Loading Pokemon #{id}...</p>

	
{:then {id, name, classfication, abilities, against_bug, against_dark, against_dragon, against_electric, against_fairy, against_fight, against_fire, against_flying, against_ghost, against_grass, against_ground, against_ice, against_normal, against_poison, against_psychic, against_rock, against_steel, against_water, attack, base_egg_steps, base_happiness,base_total, capture_rate, defense, experience_growth, height_m, hp, japanese_name, percentage_male, pokedex_number, sp_attack, sp_defense, speed, type1, type2, weight_kg, generation, is_legendary}} 

	<h1>#{id}: {name}</h1>
		
	<h2>classfication: {classfication}</h2>

	<ul class='basic-container'>
		<h3>Abilities</h3>

		{#each abilities as ability}
			
			<li>{ability}</li>

		{:else}

			<li>no abilities</li>

		{/each}

	</ul>

	<ul class='basic-container'>
		<h3>Against Types</h3>
		<li>against_bug: {against_bug}</li>
		<li>against_dark: {against_dark}</li>
		<li>against_dragon: {against_dragon}</li>
		<li>against_electric: {against_electric}</li>
		<li>against_fairy: {against_fairy}</li>
		<li>against_fight: {against_fight}</li>
		<li>against_fire: {against_fire}</li>
		<li>against_flying: {against_flying}</li>
		<li>against_ghost: {against_ghost}</li>
		<li>against_grass: {against_grass}</li>
		<li>against_ground: {against_ground}</li>
		<li>against_ice: {against_ice}</li>
		<li>against_normal: {against_normal}</li>
		<li>against_poison: {against_poison}</li>
		<li>against_psychic: {against_psychic}</li>
		<li>against_rock: {against_rock}</li>
		<li>against_steel: {against_steel}</li>
		<li>against_water: {against_water}</li>
	</ul>

	<ul class='basic-container'>
		<h3>Base Stats</h3>
		<li>attack: {attack}</li>
		<li>base_egg_steps: {base_egg_steps}</li>
		<li>base_happiness: {base_happiness}</li>
		<li>base_total: {base_total}</li>
		<li>capture_rate: {capture_rate}</li>
		<li>defense: {defense}</li>
		<li>experience_growth: {experience_growth}</li>
		<li>height_m: {height_m}</li>
		<li>hp: {hp}</li>
		<li>japanese_name: {japanese_name}</li>
		<li>percentage_male: {percentage_male}</li>
		<li>pokedex_number: {pokedex_number}</li>
		<li>sp_attack: {sp_attack}</li>
		<li>sp_defense: {sp_defense}</li>
		<li>speed: {speed}</li>
		<li>type1: {type1}</li>
		<li>type2: {type2}</li>
		<li>weight_kg: {weight_kg}</li>
		<li>generation: {generation}</li>
		<li>is_legendary: {is_legendary}</li>
	</ul>
{/await}