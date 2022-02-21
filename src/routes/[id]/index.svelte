<script context="module" lang='ts'>

	import type { LoadInput } from '@sveltejs/kit';
	import { allPokemonRequest, baseApiUrl } from '../../constants/api';

	export const load = async ({params}: LoadInput) => {

		let id = params.id

		return { props: { id } }
	} 

</script>

<script lang="ts">

	import { get } from '../../utils/get'

	export let id

	console.log(get(`${allPokemonRequest}/${id}`))

</script>

<a href="/">Back to main search</a>

<h1>{id}</h1>