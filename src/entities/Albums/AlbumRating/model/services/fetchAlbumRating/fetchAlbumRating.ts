import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IAlbumRating } from 'shared/types';

export const fetchAlbumRating =
	createAsyncThunk<IAlbumRating, string, { rejectValue: string }>
	(
		'albumRating/fetchAlbumRating',
		async (id, thunkAPI) => {
			try {
				const response = await axiosInstance.get<ApiResponse<IAlbumRating>>(`/albums/rating/${id}`);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return response.data.data;
			} catch (error) {
				if (error.response && error.response?.status === 401) {
					thunkAPI.dispatch(userActions.logout());
				}

				return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	);