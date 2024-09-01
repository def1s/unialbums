import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from 'entities/Notification';
import { getPersonalProfileData, personalProfileActions } from 'entities/PersonalProfile';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IProfile } from 'shared/types';
import { NotificationTypes } from 'shared/types/notificationTypes';
import { getPersonalProfileFormForm } from '../../selectors/selectors';

export const updatePersonalProfileData = createAsyncThunk<
	void,
	void,
	{ rejectValue: string }
>(
	'personalProfileForm/updatePersonalProfileData',
	async (_, thunkApi) => {
		// TODO Сделать конфиг для типизации thunk
		// @ts-expect-error отсутствует типизация для thunk
		const data = getPersonalProfileData(thunkApi.getState());
		// @ts-expect-error отсутствует типизация для thunk
		const form = getPersonalProfileFormForm(thunkApi.getState());

		if (!form) {
			return thunkApi.rejectWithValue('Неправильно заполнены поля формы или вовсе пусты');
		}

		try {
			const formData = await createFormData(form, data);

			const response =
				await axiosInstance.put<ApiResponse<undefined>>('/users/myProfile', formData);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			thunkApi.dispatch(notificationActions.addNotification({ message: response.data.message }));
			thunkApi.dispatch(personalProfileActions.updateProfile(form));
		} catch (error) {
			if (error.response && error.response?.status === 401) {
				thunkApi.dispatch(userActions.logout());
			}
			const errorMessage = error.response.data.message || 'Непредвиденная ошибка';
			thunkApi.dispatch(notificationActions.addNotification({ message: errorMessage, theme: NotificationTypes.ERROR }));
			return thunkApi.rejectWithValue(errorMessage);
		}
	}
);

/**
 * Создает объект FormData для отправки на сервер.
 *
 * @param {IProfile} profileForm Форма профиля, содержащая обновленные данные.
 * @param {IProfile} [profileData] Исходные данные профиля.
 * @returns {Promise<FormData>} Объект FormData для отправки на сервер.
 */
const createFormData = async (profileForm: IProfile, profileData?: IProfile): Promise<FormData> => {
	const formData = new FormData();
	const { avatar, ...otherFormFields } = profileForm;

	// если аватарки нет, то мы ее удаляем
	if (avatar?.length === 0) {
		formData.append('avatar', ' ');
		// если аватарка из формы не совпала с аватаркой из изначальных данных, то она изменилась
	} else if (avatar !== profileData?.avatar) {
		const blobImg = await fetch(avatar || '').then(res => res.blob());
		formData.append('avatar', blobImg);
	}

	Object.entries(otherFormFields).forEach(([name, value]) => {
		formData.append(name, String(value));
	});

	return formData;
};
