import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '../../slice/userSlice';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';

export const userLogout = createAsyncThunk<void, void, { rejectValue: string }>(
	'user/userLogout',
	async (_, thunkAPI) => {
		try {
			await axiosInstance.post('/logout');
			thunkAPI.dispatch(userActions.logout());
		} catch (error) {
			return thunkAPI.rejectWithValue(
				'Непредвиденная ошибка при попытке выйти из аккаунта (проверьте интернет-соединение)'
			);
		}
	}
);
