import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from 'entities/AlbumCard';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { updateAccessToken } from 'shared/api/services/updateAccessToken/updateAccessToken';
import { userActions } from 'entities/User';

export const getAlbumsByAccessToken = createAsyncThunk<Album[], undefined, { rejectValue: string }>(
	'albums/getAlbumsByAccessToken',
	async (_, thunkAPI) => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

		const options: AxiosRequestConfig = {
			method: 'GET',
			url: 'http://localhost:8081/albums/getByUserId',
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		};

		try {
			const response = await axios<ApiResponse<Album>>(options);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return response.data.data;
		} catch (error) {

			if (error.response && error.response.status === 403) {
				try {
					const isTokenUpdated = await updateAccessToken();

					if (isTokenUpdated) {
						const updatedToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
						options.headers['Authorization'] = `Bearer ${updatedToken}`;
						const response = await axios<ApiResponse<Album>>(options);
						return response.data.data;
					} else if (isTokenUpdated === null) {
						return thunkAPI.rejectWithValue('Произошла неожиданная ошибка');
					} else {
						thunkAPI.dispatch(userActions.logout());
					}

				} catch (error) {
					console.log(error);
				}
			}

			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
