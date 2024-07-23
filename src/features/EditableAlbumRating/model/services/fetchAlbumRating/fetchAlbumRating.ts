import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import { IAlbumRating } from 'entities/Albums';

interface FetchAlbumRatingProps {
	id?: string | number;
}

export const fetchAlbumRating =
	createAsyncThunk<IAlbumRating, FetchAlbumRatingProps, { rejectValue: string }>
	(
		'albumRating/fetchAlbumRating',
		async ({ id }, thunkApi) => {
			try {
				const response = await axiosInstance.get<ApiResponse<IAlbumRating>>(`/albums/rating/${id}`);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return response.data.data;
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkApi.dispatch(userActions.logout());
				}

				return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	);
