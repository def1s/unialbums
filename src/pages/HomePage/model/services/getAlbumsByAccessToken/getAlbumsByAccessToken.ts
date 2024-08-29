import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbum } from 'entities/Albums';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';

export const getAlbumsByAccessToken = createAsyncThunk<IAlbum[], void, { rejectValue: string }>(
	'homePage/getAlbumsByAccessToken',
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get<ApiResponse<IAlbum[]>>('/albums/getByUserId');

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return response.data.data;
		} catch (error) {
			if (error.response && error.response?.status === 401) {
				thunkAPI.dispatch(userActions.logout());
			}

			return thunkAPI.rejectWithValue(error.response?.data?.message || 'Непредвиденная ошибка');
		}
	}
);
