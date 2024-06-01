import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from 'features/EditableUserProfile/model/services/validateProfileData/validateProfileData';
import { ValidateProfileError } from 'features/EditableUserProfile/model/types/editableUserProfileSchema';

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
			// TODO Сделать конфиг для типизации thunk
			// @ts-expect-error отсутствует типизация для thunk
			const formData = getProfileForm(thunkApi.getState());

			const errors = validateProfileData(formData);

			if (Object.keys(errors).length) {
				return thunkApi.rejectWithValue(errors);
			}

			try {
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
