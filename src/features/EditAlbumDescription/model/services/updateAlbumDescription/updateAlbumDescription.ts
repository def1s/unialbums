import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAlbumDescriptionData } from 'entities/Albums/AlbumDescription';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IAlbumDescription } from 'shared/types';
import { getAlbumDescriptionFormData } from '../../selectors/selectors';

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
		'editAlbumDescription/updateAlbumDescription',
		async ({ id }, thunkApi) => {
			// Получение формы альбома и данных альбома из состояния
			// @ts-expect-error отсутствует типизация для thunk
			const albumForm = getAlbumDescriptionFormData(thunkApi.getState());
			// @ts-expect-error отсутствует типизация для thunk
			const albumData = getAlbumDescriptionData(thunkApi.getState());

			if (!albumForm) {
				return thunkApi.rejectWithValue('Некорректно заполнены данные');
			}

			try {
				const formData = await createFormData(albumForm, albumData);

				const response =
					await axiosInstance.put<ApiResponse<undefined>>(`/albums/description/${id}`, formData);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return { serverMessage: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 401) {
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
const createFormData = async (albumForm: IAlbumDescription, albumData?: IAlbumDescription): Promise<FormData> => {
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