import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from 'entities/Notification';
import { userInitAuthData } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

interface RegistrationProps {
	email: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
}

export const registration = createAsyncThunk<void, RegistrationProps, { rejectValue: string }>(
	'registration',
	async (registrationData, thunkApi) => {
		try {
			const response =
				await axiosInstance.post<ApiResponse<undefined>>('/registration', registrationData);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			thunkApi.dispatch(userInitAuthData());
			thunkApi.dispatch(notificationActions.addNotification({ message: 'Вы успешно зарегистрировались' }));
			// return { message: response.data.message };
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
