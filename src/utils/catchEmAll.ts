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
	
			throw new Error(`${res.status}`)
	
		}

	} catch (err) {

		switch(err.message) {

			case '502':
				console.error(`Server asleep, please reload, status: ${err.message}`)
				error.set(`Server asleep, please reload, status: ${err.message}`)
				loading.set(false)
				break;
			default:
				console.error(`Server response !== ok, status: ${err.message}`)
				error.set(`Server response !== ok, status: ${err.message}`)
				loading.set(false)
		}
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

			throw new Error(`${res.status}`)
		}

	} catch (err) { 

		switch(err.message) {

			case '502':
				console.error(`Server asleep, please reload, status: ${err.message}`)
				error.set(`Server asleep, please reload, status: ${err.message}`)
				loading.set(false)
				break;
			default:
				console.error(`Server response !== ok, status: ${err.message}`)
				error.set(`Server response !== ok, status: ${err.message}`)
				loading.set(false)
		}
	}
}