import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '../../slice/userSlice';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

interface UserInitAuthDataResult {
	username: string;
	avatar?: string;
}

export const userInitAuthData = createAsyncThunk<UserInitAuthDataResult, void, { rejectValue: string }>(
	'user/userInitAuthData',
	async (_, thunkAPI) => {
		try {

			const response = await axiosInstance.get<ApiResponse<UserInitAuthDataResult>>('/users/getUserInfo');

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return response.data.data[0];
		} catch (error) {
			if (error.response && error.response?.status === 403) {
				thunkAPI.dispatch(userActions.logout());
			}

			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
