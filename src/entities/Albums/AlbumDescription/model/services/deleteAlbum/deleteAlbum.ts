import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

interface DeleteAlbumProps {
	id?: string | number;
}

// TODO перенести в фичи
export const deleteAlbum =
	createAsyncThunk<string, DeleteAlbumProps, { rejectValue: string }>
	(
		'albumDescription/deleteUserAlbum',
		async ({ id }, thunkApi) => {
			try {
				const response = await axiosInstance.delete<ApiResponse<undefined>>(`/albums/${id}`);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return response.data.message;
			} catch (error) {
				if (error.response && error.response?.status === 401) {
					thunkApi.dispatch(userActions.logout());
				}

				return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	);
