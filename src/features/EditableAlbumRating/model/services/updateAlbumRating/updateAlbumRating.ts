import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import {
	getAlbumRatingSliders
} from '../../selectors/getAlbumRatingSliders/getAlbumRatingSliders';
import { IAlbumRating } from 'entities/Albums';

interface UpdateAlbumRatingProps {
	id?: string | number;
}

interface UpdateAlbumRatingResponse {
	data: IAlbumRating,
	serverMessage: string;
}

export const updateAlbumRating =
	createAsyncThunk<UpdateAlbumRatingResponse, UpdateAlbumRatingProps, { rejectValue: string }>
	(
		'albumRating/updateAlbumRating',
		async ({ id }, thunkAPI) => {
			// @ts-expect-error отсутствует типизация для thunk
			const ratingSliders = getAlbumRatingSliders(thunkAPI.getState());

			try {
				const response =
					await axiosInstance.put<ApiResponse<IAlbumRating>>(`/albums/rating/${id}`, ratingSliders);

				if (!response.data) {
					throw new Error('Что-то пошло нет так');
				}

				return {
					data: response.data.data,
					serverMessage: response.data.message,
				};
			} catch (error) {
				if (error.response && error.response?.status === 401) {
					thunkAPI.dispatch(userActions.logout());
					thunkAPI.dispatch(userActions.logout());
				}

				return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	);