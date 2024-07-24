import axios from 'axios';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ApiResponse, token } from 'shared/api/types/apiResponse';

const axiosInstance = axios.create({
	baseURL: __API_URL__,
	withCredentials: true
});

let isRefreshing = false;
// eslint-disable-next-line
let requestsQueue: any[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
	requestsQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	requestsQueue = [];
};

axiosInstance.interceptors.request.use(config => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(response => {
	return response;
}, error => {
	const originalRequest = error.config;

	if (error.response.status === 401 && !originalRequest._retry) {
		if (isRefreshing) {
			return new Promise(function(resolve, reject) {
				requestsQueue.push({ resolve, reject });
			}).then(token => {
				originalRequest.headers.Authorization = 'Bearer ' + token;
				return axiosInstance(originalRequest);
			}).catch(err => {
				return Promise.reject(err);
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		const refreshToken = async () => {
			try {
				const refreshResponse = await axios.get<ApiResponse<token>>(`${__API_URL__}/refresh`, { withCredentials: true });
				const updatedToken = refreshResponse.data.data.accessToken;
				localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, updatedToken);
				axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + updatedToken;
				processQueue(null, updatedToken);
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		};

		return refreshToken();
	}

	return Promise.reject(error);
});

export default axiosInstance;
