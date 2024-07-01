import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import {
	getAlbumDescriptionForm
} from '../../selectors/getAlbumDescriptionForm/getAlbumDescriptionForm';
import {
	getAlbumDescriptionData
} from 'features/EditableAlbumDescription/model/selectors/getAlbumDescriptionData/getAlbumDescriptionData';

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
			const formData = new FormData();
			// TODO Сделать конфиг для типизации thunk
			// @ts-expect-error отсутствует типизация для thunk
			const albumForm = getAlbumDescriptionForm(thunkApi.getState());
			// @ts-expect-error отсутствует типизация для thunk
			const albumData = getAlbumDescriptionData(thunkApi.getState());

			if (!albumForm) {
				return thunkApi.rejectWithValue('Некорректно заполнены данные');
			}

			try {
				const { cover, ...otherFormFields } = albumForm;

				// если обложки нет, то мы ее удаляем
				if (cover?.length === 0) {
					formData.append('cover', ' ');
				// если обложка из формы не совпала с обложкой из данных, то она изменилась
				} else if (albumData?.cover !== cover) {
					const blobImg = await fetch(cover || '').then(res => res.blob());
					formData.append('cover', blobImg);
				}

				Object.entries(otherFormFields).forEach(([name, value]) => {
					formData.append(name, String(value));
				});

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
