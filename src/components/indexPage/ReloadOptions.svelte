<script lang='ts'>



	const handleReload = (option) => {
		error = false

		switch(option) {
			case 'all':
				get(allPokemonRequest)
				break;
			case 'search':
				// code block
				break;
			case 'chaos':
				// code block
				break;
			case 'flakey':
				// code block
				break;
			default:
				get(allPokemonRequest)
		}

	}

</script>