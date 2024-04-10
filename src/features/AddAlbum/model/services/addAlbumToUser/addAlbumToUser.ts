import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { Album } from 'entities/AlbumCard';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { updateAccessToken } from 'shared/api/services/updateAccessToken/updateAccessToken';
import { userActions } from 'entities/User';

interface LoginByUsernameProps extends Omit<Album, 'albumId'> {}

export const addAlbumToUser = createAsyncThunk<null, LoginByUsernameProps, { rejectValue: string }>(
	'albumForm/addAlbumToUser',
	async (albumData, thunkAPI) => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
		const formData = new FormData();
		const { cover, ...otherAlbumData } = albumData;

		const options: AxiosRequestConfig = {
			method: 'POST',
			url: 'http://localhost:8081/albums/create',
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		};

		try {
			const blobImg = await fetch(cover).then(res => res.blob());
			formData.append('cover', blobImg);

			Object.entries(otherAlbumData).forEach(([name, value]) => {
				formData.append(name, String(value));
			});

			options.data = formData;

			const response = await axios<ApiResponse<null>>(options);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}
		} catch (error) {

			if (error.response && error.response.status === 403) {
				try {
					const isTokenUpdated = await updateAccessToken();

					if (isTokenUpdated) {
						const updatedToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
						options.headers['Authorization'] = `Bearer ${updatedToken}`;
						const response = await axios<ApiResponse<Album>>(options);
						return;
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
