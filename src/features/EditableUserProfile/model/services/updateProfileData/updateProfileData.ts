import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { ValidateProfileError } from '../../types/editableUserProfileSchema';
import { getProfileData } from '../../selectors/getProfileData/getProfileData';

interface UpdateProfileDataResult {
	message: string;
}

export const updateProfileData = createAsyncThunk<
	UpdateProfileDataResult,
	void,
	{ rejectValue: ValidateProfileError }
	>(
		'profile/updateProfileData',
		async (_, thunkApi) => {
			const formData = new FormData();

			// TODO Сделать конфиг для типизации thunk
			// @ts-expect-error отсутствует типизация для thunk
			const profileData = getProfileData(thunkApi.getState());
			// @ts-expect-error отсутствует типизация для thunk
			const profileForm = getProfileForm(thunkApi.getState());

			// валидация ошибок
			const errors = validateProfileData(profileForm);

			// если ошибки есть, то запрос не отправляется
			if (Object.keys(errors).length) {
				return thunkApi.rejectWithValue(errors);
			}

			if (!profileForm) {
				return thunkApi.rejectWithValue({ NO_DATA: true });
			}

			try {
				const { avatar, ...otherFormFields } = profileForm;

				// если старая аватарка не совпадает с новой, то отправляем ее в запрос на обновление данных профиля
				if (avatar !== profileData?.avatar) {
					const blobImg = await fetch(avatar || '').then(res => res.blob());
					formData.append('cover', blobImg);
				}

				// добавляем каждый элемент из формы в запрос
				Object.entries(otherFormFields).forEach(([name, value]) => {
					formData.append(name, String(value));
				});

				const response =
					await axiosInstance.put<ApiResponse<undefined>>('/users/myProfile', formData);

				if (!response.data) {
					throw new Error('Что-то пошло не так');
				}

				return { message: response.data.message };
			} catch (error) {
				if (error.response && error.response?.status === 403) {
					thunkApi.dispatch(userActions.logout());
				}

				return thunkApi.rejectWithValue({ SERVER_ERROR: true });
			}
		}
	);
