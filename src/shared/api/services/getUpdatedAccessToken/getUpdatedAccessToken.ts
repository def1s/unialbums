import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, token } from 'shared/api/types/apiResponse';

export const getUpdatedAccessToken = async (): Promise<string | null> => {
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

		return response.data.data[0].accessToken;
	} catch (error) {
		return null;
	}
};
