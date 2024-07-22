import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import {
	getAlbumDescriptionForm
} from '../../selectors/getAlbumDescriptionForm/getAlbumDescriptionForm';
import {
	getAlbumDescriptionData
} from '../../selectors/getAlbumDescriptionData/getAlbumDescriptionData';
import { Album } from 'entities/Albums';

interface UpdateAlbumDescriptionProps {
	id?: string | number;
}

interface UpdateAlbumDescriptionResponse {
	serverMessage: string;
}

/**
 * Асинхронный thunk для обновления описания альбома.
 *
 * @param {UpdateAlbumDescriptionProps} props Свойства, содержащие идентификатор альбома.
 * @returns {Promise<UpdateAlbumDescriptionResponse>} Ответ сервера с сообщением.
 */
export const updateAlbumDescription =
	createAsyncThunk<UpdateAlbumDescriptionResponse, UpdateAlbumDescriptionProps, { rejectValue: string }>(
		'albumDescription/updateAlbumDescription',
		async ({ id }, thunkApi) => {
			// Получение формы альбома и данных альбома из состояния
			// @ts-expect-error отсутствует типизация для thunk
			const albumForm = getAlbumDescriptionForm(thunkApi.getState());
			// @ts-expect-error отсутствует типизация для thunk
			const albumData = getAlbumDescriptionData(thunkApi.getState());

			if (!albumForm) {
				return thunkApi.rejectWithValue('Некорректно заполнены данные');
			}

			try {
				const formData = await createFormData(albumForm, albumData);

				const response =
					await axiosInstance.put<ApiResponse<undefined>>(`/albums/${id}`, formData);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return { serverMessage: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkApi.dispatch(userActions.logout());
				}

				return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	);

/**
 * Создает объект FormData для отправки на сервер.
 *
 * @param {Album} albumForm Форма альбома, содержащая обновленные данные.
 * @param {Album} [albumData] Исходные данные альбома.
 * @returns {Promise<FormData>} Объект FormData для отправки на сервер.
 */
const createFormData = async (albumForm: Album, albumData?: Album): Promise<FormData> => {
	const formData = new FormData();
	const { cover, ...otherFormFields } = albumForm;

	if (cover?.length === 0) {
		formData.append('cover', ' ');
	} else if (albumData?.cover !== cover) {
		const blobImg = await fetch(cover || '').then(res => res.blob());
		formData.append('cover', blobImg);
	}

	Object.entries(otherFormFields).forEach(([name, value]) => {
		formData.append(name, String(value));
	});

	return formData;
};
