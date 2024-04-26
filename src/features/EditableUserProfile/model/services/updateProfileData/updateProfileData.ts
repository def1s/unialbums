import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import { getAlbumFormData } from 'features/AddAlbum/model/selectors/getAlbumFormData/getAlbumFormData';

export const updateProfileData = createAsyncThunk<void, void, { rejectValue: string }>(
	'profile/updateProfileData',
	async (_, thunkApi) => {
		// TODO Сделать конфиг для типизации thunk
		//@ts-expect-error
		const formData = getAlbumFormData(thunkApi.getState());

		try {
			const response =
				await axiosInstance.put<ApiResponse<undefined>>('/users/myProfile', formData);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

		} catch (error) {
			if (error.response && error.response?.status === 403) {
				thunkApi.dispatch(userActions.logout());
			}

			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
