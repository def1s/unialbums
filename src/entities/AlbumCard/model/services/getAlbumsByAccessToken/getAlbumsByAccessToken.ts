import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types/userAlbumsSchema';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const getAlbumsByAccessToken = createAsyncThunk<Album[], null, { rejectValue: string }>(
	'albums/getAlbumsByAccessToken',
	async (_, thunkAPI) => {
		try {
			const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

			const options: AxiosRequestConfig = {
				method: 'GET',
				url: 'http://localhost:8081/albums/getByUserId',
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			};

			const response = await axios<ApiResponse<Album>>(options);

			if (!response.data) {
				console.log('empty');
			}

			return response.data.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue('Произошла ошибка!');
		}
	}
);
