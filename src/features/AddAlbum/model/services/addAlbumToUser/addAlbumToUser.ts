import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { getAlbumFormData } from 'features/AddAlbum/model/selectors/getAlbumFormData/getAlbumFormData';
import { Album } from 'entities/Albums';

interface LoginByUsernameResult {
	serverMessage: string;
}

export const addAlbumToUser = createAsyncThunk<
	LoginByUsernameResult,
	void,
	{ rejectValue: string }
>(
	'albumForm/addAlbumToUser',
	async (_, thunkAPI) => {
		// TODO Сделать конфиг для типизации thunk
		// @ts-expect-error отсутствует типизация для thunk
		const albumForm = getAlbumFormData(thunkAPI.getState());

		if (!albumForm) {
			return thunkAPI.rejectWithValue('Недопустимый ввод или пустое поле');
		} else {
			try {
				const formData = await createFormData(albumForm);

				const response =
					await axiosInstance.post<ApiResponse<null>>('/albums/create', formData);

				return { serverMessage: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkAPI.dispatch(userActions.logout());
				}

				return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
			}
		}
	}
);

/**
 * Создает объект FormData для отправки на сервер.
 *
 * @param {Album} albumForm Форма альбома, содержащая обновленные данные.
 * @returns {Promise<FormData>} Объект FormData для отправки на сервер.
 */
const createFormData = async (albumForm: Album): Promise<FormData> => {
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
