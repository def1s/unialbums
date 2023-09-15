class AlbumsServices {
	getAlbums = async (url) => {
		const res = await fetch(
			url,
			{
				method: 'GET'
			}
	);
		return await res.json();
	}

	postAlbum = async (url, album) => {
		const res = await fetch(
			url,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(album)
			}
		)
		.catch(error => new Error('Something went wrong...'));

		return await res.json();
	}
}

export default AlbumsServices;