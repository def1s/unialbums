import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { getAlbumFormData } from 'features/AddAlbum/model/selectors/getAlbumFormData/getAlbumFormData';

interface LoginByUsernameResult {
	message: string;
}

export const addAlbumToUser = createAsyncThunk<
	LoginByUsernameResult,
	void,
	{ rejectValue: string }
>(
	'albumForm/addAlbumToUser',
	async (_, thunkAPI) => {
		const formData = new FormData();

		// TODO Сделать конфиг для типизации thunk
		// @ts-expect-error отсутствует типизация для thunk
		const albumForm = getAlbumFormData(thunkAPI.getState());
		console.log(albumForm);

		if (!albumForm) {
			return thunkAPI.rejectWithValue('Недопустимый ввод или пустое поле');
		} else {
			try {
				const { cover, ...otherFormFields } = albumForm;
				const blobImg = await fetch(cover || '').then(res => res.blob());
				formData.append('cover', blobImg);

				Object.entries(otherFormFields).forEach(([name, value]) => {
					formData.append(name, String(value));
				});

				const response =
					await axiosInstance.post<ApiResponse<null>>('/albums/create', formData);

				return { message: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkAPI.dispatch(userActions.logout());
				}

				return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	}
);
