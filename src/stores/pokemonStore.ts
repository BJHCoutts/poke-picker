import { writable, type Writable } from "svelte/store";
import type { Pokemon } from "../types";

export const pokemons:Writable<Pokemon[]> = writable([])
export const loading:Writable<boolean> = writable(false)
export const endOfList:Writable<boolean> = writable(false)
export const error:Writable<string> = writable('')

const getAdditionalPages = async (apiUrl, nextPage) => {

	const res = await fetch(`${apiUrl}/?page=${nextPage}`)

	if (res.status === 200) {

		const data = await res.json()

		pokemons.update((pokemons) => [...pokemons, ...data.pokemon])

		if (data.nextPage && data.nextPage !== 'undefined') {

			getAdditionalPages(apiUrl, data.nextPage)
		} else { 
			loading.set(false)
			endOfList.set(true)
		}

	} else {

		loading.set(false)
		console.error('Status !== 200')
		error.set('The server response status !== 200')

	}

}

export const catchThemAll = async (apiUrl: string) => {
	loading.set(true)

	try {

		const res = await fetch(apiUrl)

		if (res.status === 200) {

			const data = await res.json()
		
				pokemons.set([...data.pokemon])

				if (data.nextPage && data.nextPage !== 'undefined') {

					getAdditionalPages(apiUrl, data.nextPage)

				} 
				else { 
					loading.set(false)
					endOfList.set(true)
				}

				loading.set(false)

				let pokemonsValue

				pokemons.subscribe( value => pokemonsValue = value)

				return pokemonsValue

		} else {

			loading.set(false)
			console.error('Status !== 200')
			error.set('The server response status !== 200')
		}

	} catch (error) { 
		console.error(error)
	}
}