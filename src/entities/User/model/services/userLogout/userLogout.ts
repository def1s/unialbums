import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { userActions } from '../../slice/userSlice';

export const userLogout = createAsyncThunk<void, void, { rejectValue: string }>(
	'user/userLogout',
	async (_, thunkAPI) => {
		try {
			const options: AxiosRequestConfig = {
				method: 'GET',
				url: `${__API_URL__}/logout`,
				withCredentials: true
			};

			await axios(options);
			thunkAPI.dispatch(userActions.logout());
		} catch (error) {
			return thunkAPI.rejectWithValue(
				'Непредвиденная ошибка при попытке выйти из аккаунта (проверьте интернет-соединение)'
			);
		}
	}
);
