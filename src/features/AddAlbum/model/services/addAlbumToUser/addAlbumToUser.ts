import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from 'entities/Notification';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IAlbum } from 'shared/types';
import { NotificationTypes } from 'shared/types/notificationTypes';
import { getAlbumFormData } from '../../selectors/getAlbumFormData/getAlbumFormData';

export const addAlbumToUser = createAsyncThunk<
	void,
	void
>(
	'albumForm/addAlbumToUser',
	async (_, thunkAPI) => {
		// TODO Сделать конфиг для типизации thunk
		// @ts-expect-error отсутствует типизация для thunk
		const albumForm = getAlbumFormData(thunkAPI.getState());

		if (!albumForm) {
			thunkAPI.dispatch(notificationActions.addNotification({
				message: 'Недопустимый ввод или пустое поле',
				theme: NotificationTypes.ERROR
			}));
		} else {
			try {
				const formData = await createFormData(albumForm);

				const response =
					await axiosInstance.post<ApiResponse<null>>('/albums/create', formData);

				thunkAPI.dispatch(notificationActions.addNotification({ message: response.data.message }));
			} catch (error) {
				if (error.response && error.response?.status === 401) {
					thunkAPI.dispatch(userActions.logout());
				}

				const errorMessage = error.response.data.message || 'Непредвиденная ошибка';

				thunkAPI.dispatch(notificationActions.addNotification({
					message: errorMessage,
					theme: NotificationTypes.ERROR
				}));
			}
		}
	}
);

/**
 * Создает объект FormData для отправки на сервер.
 *
 * @param {IAlbum} albumForm Форма альбома, содержащая обновленные данные.
 * @returns {Promise<FormData>} Объект FormData для отправки на сервер.
 */
const createFormData = async (albumForm: IAlbum): Promise<FormData> => {
	const formData = new FormData();
	// TODO Подумать, нет ли более простого решения
	// достаем локальное изображение по ссылке из слайса и преобразовываем
	// для передачи на сервер
	const { cover, ...otherFormFields } = albumForm;
	const blobImg = await fetch(cover || '').then(res => res.blob());
	formData.append('cover', blobImg);

	Object.entries(otherFormFields).forEach(([name, value]) => {
		formData.append(name, String(value));
	});

	return formData;
};
