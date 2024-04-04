import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, token } from 'shared/api/types/apiResponse';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const updateAccessToken = async (): Promise<boolean | null> => {
	// boolean - ясно выяснил состояние токена, null - что-то может быть не так помимо токена
	try {
		const options: AxiosRequestConfig = {
			method: 'GET',
			url: 'http://localhost:8081/refresh',
			withCredentials: true
		};

		const response = await axios<ApiResponse<token>>(options);

		if (!response.data) {
			throw new Error('Что-то пошло не так');
		}

		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, response.data.data[0].accessToken);

		return true;
	} catch (error) {
		console.log(error);
		if (error.response && error.response.status === 403 ||  error.response.status === 404) {
			return false;
		}
		// если ошибки не 403 или 404, то, возможно, проблема не в токене
		return null;
	}
};
