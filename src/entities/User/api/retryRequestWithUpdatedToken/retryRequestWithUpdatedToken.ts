import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, token } from 'shared/api/types/apiResponse';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';

export const useRetryRequestWithUpdatedToken = async <T>(options: AxiosRequestConfig) => {
	const dispatch = useDispatch();

	try {
		const refreshOptions: AxiosRequestConfig = {
			method: 'GET',
			url: 'http://localhost:8081/refresh',
			withCredentials: true
		};

		const response = await axios<ApiResponse<token>>(refreshOptions);

		if (!response.data) {
			throw new Error('Что-то пошло не так');
		}

		const updatedToken = response.data.data[0].accessToken;

		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, updatedToken);
		options.headers['Authorization'] = `Bearer ${updatedToken}`;
		return await axios<ApiResponse<T>>(options);

	} catch (error) {
		if (error.response && error.response.status === 403) {
			dispatch(userActions.logout());
		} else {
			return false;
		}
	}
};
