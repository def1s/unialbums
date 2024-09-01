import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse, token } from 'shared/api/types/apiResponse';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<void, LoginByUsernameProps, { rejectValue: string }>(
	'login/loginByUsername',
	async (authData, thunkApi) => {
		try {
			const response = await axiosInstance.post<ApiResponse<token>>('/loginByUsername', authData);

			console.log('RESPONSE' + response);

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			const accessToken = response.data.data.accessToken;

			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
