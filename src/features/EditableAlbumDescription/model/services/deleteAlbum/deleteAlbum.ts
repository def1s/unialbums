import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';

interface DeleteAlbumProps {
	id?: string | number;
}

export const deleteAlbum =
	createAsyncThunk<string, DeleteAlbumProps, { rejectValue: string }>
	(
		'albumDescription/deleteAlbum',
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
