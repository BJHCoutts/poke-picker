<script lang='ts'>
import { allPokemonRequest } from "../constants/api";

import { get } from "../utils/get";

	console.log(Object.keys(get(allPokemonRequest)))
	
</script>

<style>

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
</section>