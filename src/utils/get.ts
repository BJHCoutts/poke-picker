export const get =  async (apiUrl: string) => {

	try {

		const res = await fetch(apiUrl)

		if (res.status === 200) {
			const data = await res.json()

			return await data
		} else {
			console.error('Status !== 200')
		}

	} catch (error) { 
		console.error(error)
	}
}