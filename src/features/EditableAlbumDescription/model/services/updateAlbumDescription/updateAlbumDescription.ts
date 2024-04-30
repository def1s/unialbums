import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import {
	getAlbumDescriptionForm
} from '../../selectors/getAlbumDescriptionForm/getAlbumDescriptionForm';

interface UpdateAlbumDescriptionProps {
	id?: string | number;
}

interface UpdateAlbumDescriptionResponse {
	message: string;
}

export const updateAlbumDescription =
	createAsyncThunk<UpdateAlbumDescriptionResponse, UpdateAlbumDescriptionProps, { rejectValue: string }>(
		'albumDescription/updateAlbumDescription',
		async ({ id }, thunkApi) => {
		// TODO Сделать конфиг для типизации thunk
		// @ts-expect-error отсутствует типизация для thunk
			const formData = getAlbumDescriptionForm(thunkApi.getState());

			try {
				const response =
				await axiosInstance.put<ApiResponse<undefined>>(`/albums/${id}`, formData);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return { message: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkApi.dispatch(userActions.logout());
				}

				return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	);
