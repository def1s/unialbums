import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from 'entities/AlbumCard';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getUpdatedAccessToken } from 'shared/api/services/getUpdatedAccessToken/getUpdatedAccessToken';
import { userActions } from 'entities/User';

export const getAlbumsByAccessToken = createAsyncThunk<Album[], null, { rejectValue: string }>(
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
			return response.data.data;
		} catch (error) {
			if (error.response && error.response.status === 403) {
				try {
					const updatedToken = await getUpdatedAccessToken();
					if (updatedToken) {
						localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, updatedToken);
						options.headers['Authorization'] = `Bearer ${updatedToken}`;
						const response = await axios<ApiResponse<Album>>(options);
						return response.data.data;
					}
				} catch (error) {
					if (error.response && error.response.status === 403) {
						thunkAPI.dispatch(userActions.logout());
						return thunkAPI.rejectWithValue('Необходима повторная авторизация');
					}
				}
			}

			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
