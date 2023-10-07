import { useHttp } from "../hooks/http.hook";

const useAlbumsServices = () => { //добавить обработки ошибок через .ok и .catch
	const {request, loading, error, clearError} = useHttp();

	const getAlbums = async (url) => {
		const res = request(url);
		return await res;
	}

	const postAlbum = async (url, album) => {
		const res = await request(url, 'POST', album);
		return await res;
	}

	return {getAlbums, postAlbum, loading, error, clearError};
}

export default useAlbumsServices;