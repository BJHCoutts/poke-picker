import { endOfList, error, loading, pokemons } from "../stores/pokemonStore"

const getAdditionalPages = async (apiUrl, nextPage) => {

	endOfList.set(false)

	try {

		const res = await fetch(`${apiUrl}/?page=${nextPage}`)
	
		if (res.ok) {
	
			const data = await res.json()
	
			pokemons.update((pokemons) => [...pokemons, ...data.pokemon])
	
			if (data.nextPage && data.nextPage !== 'undefined') {
	
				getAdditionalPages(apiUrl, data.nextPage)
			} else { 
				loading.set(false)
				endOfList.set(true)
			}
	
		} else {
	
			console.error(`Response !== ok, status: ${res.status}`)
			error.set(`Response !== ok, status: ${res.status}`)
			loading.set(false)
	
		}

	} catch (error) {

		console.error('caught error:', error)
		error.set('caught error:', error)
		loading.set(false)
	}

}

export const catchThemAll = async (apiUrl: string) => {
	loading.set(true)
	error.set('')
	endOfList.set(false)
	pokemons.set([])

	try {

		const res = await fetch(apiUrl)

		if (res.status === 200) {

			const data = await res.json()
		
			pokemons.set([...data.pokemon])

			if (data.nextPage && data.nextPage !== 'undefined') {

				getAdditionalPages(apiUrl, data.nextPage)

			} 

			endOfList.set(true)
			loading.set(false)

			let pokemonsValue

			pokemons.subscribe( value => pokemonsValue = value)

			return pokemonsValue

		} else {

			loading.set(false)
			console.error(`Response !== ok, status: ${res.status}`)
			error.set(`Response !== ok, status: ${res.status}`)
		}

	} catch (error) { 

		console.error('caught error:', error)
		error.set('caught error:', error)
		loading.set(false)
	}
}