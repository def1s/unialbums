import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';
import { Profile } from 'entities/Profile';

interface UpdateProfileDataResult {
	serverMessage: string;
}

export const updateProfileData = createAsyncThunk<
	UpdateProfileDataResult,
	void,
	{ rejectValue: string }
	>(
		'profile/updateProfileData',
		async (_, thunkApi) => {
			// TODO Сделать конфиг для типизации thunk
			// @ts-expect-error отсутствует типизация для thunk
			const profileData = getProfileData(thunkApi.getState());
			// @ts-expect-error отсутствует типизация для thunk
			const profileForm = getProfileForm(thunkApi.getState());

			if (!profileForm) {
				return thunkApi.rejectWithValue('Неправильно заполнены поля формы или вовсе пусты');
			}

			try {
				const formData = await createFormData(profileForm, profileData);

				const response =
					await axiosInstance.put<ApiResponse<undefined>>('/users/myProfile', formData);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return { serverMessage: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkApi.dispatch(userActions.logout());
				}

				return thunkApi.rejectWithValue(error.response.message || 'Непредвиденная ошибка');
			}
		}
	);

/**
 * Создает объект FormData для отправки на сервер.
 *
 * @param {Profile} profileForm Форма профиля, содержащая обновленные данные.
 * @param {Profile} [profileData] Исходные данные профиля.
 * @returns {Promise<FormData>} Объект FormData для отправки на сервер.
 */
const createFormData = async (profileForm: Profile, profileData?: Profile): Promise<FormData> => {
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
