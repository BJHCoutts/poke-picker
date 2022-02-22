<script lang='ts'>
	
	import { addChaos, addFlakey, allPokemonRequest, pokemonQuery } from "../../constants/api";
	import { error } from "../../stores/pokemonStore";
	import { catchThemAll } from "../../utils/catchEmAll";

	const handleReload = (option) => {
		
		error.set('')

		switch(option) {

			case 'chaos':
				catchThemAll(allPokemonRequest+addChaos)
				break;
			case 'flakey':
				catchThemAll(allPokemonRequest+addFlakey)
				break;
			default:
				catchThemAll(allPokemonRequest)
		}

	}

</script>

<style>

	button {
		width: 100%;
	}
	
	li {
		list-style-type: none;
	}
	
	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-bottom: 3em;
		grid-gap: 2em;
	}

</style>

<ul>

	<li>
		<button on:click={handleReload}>Reload All</button>
	</li>

	<li>
		<button on:click={() => handleReload('chaos')}>Reload All w Chaos</button>
	</li>

	<li>
		<button on:click={() => handleReload('flakey')}>Reload All w Flakey</button>
	</li>

</ul>