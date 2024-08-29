import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '../../slice/userSlice';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { User } from '../../types/user';

// при инициализации будет использоваться токен, который автоматически приписывает к каждому запросу axiosInstance
// если токена нет или он есть, но недействительный (как и refresh) и возвращается 403, то пользователя разлогинит

export const userInitAuthData = createAsyncThunk<User, void, { rejectValue: string }>(
	'user/userInitAuthData',
	async (_, thunkAPI) => {
		try {
			const response =
				await axiosInstance.get<ApiResponse<User>>('/initUser');

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return response.data.data;
		} catch (error) {
			if (error.response && error.response?.status === 401) {
				thunkAPI.dispatch(userActions.logout());
			}

			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
