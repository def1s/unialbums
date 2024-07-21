import axios from 'axios';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ApiResponse, token } from 'shared/api/types/apiResponse';

const axiosInstance = axios.create({
	baseURL: __API_URL__,
	withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(response => {
	return response;
}, async error => {
	const originalRequest = error.config;

	if (error.response.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true;

		try {
			// попытка обновления токена
			const refreshResponse = await axios.get<ApiResponse<token>>(`${__API_URL__}/refresh`, { withCredentials: true });
			const updatedToken = refreshResponse.data.data.accessToken;
			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, updatedToken);

			// повторный запрос с обновленным токеном
			originalRequest.headers.Authorization = `Bearer ${updatedToken}`;
			return axiosInstance(originalRequest);
		} catch (refreshError) {
			console.log('Ошибка обновления access токена: ', refreshError);
			throw refreshError;
		}
	} else {
		throw error;
	}
});

export default axiosInstance;
