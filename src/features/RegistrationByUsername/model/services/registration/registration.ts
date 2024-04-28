import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';

interface RegistrationProps {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
}

interface RegistrationResult {
	message: string;
}

export const registration = createAsyncThunk<RegistrationResult, RegistrationProps, { rejectValue: string }>(
	'registration',
	async (registrationData, thunkApi) => {
		try {
			const response =
				await axiosInstance.post<ApiResponse<undefined>>('/register', registrationData);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return { message: response.data.message };
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
