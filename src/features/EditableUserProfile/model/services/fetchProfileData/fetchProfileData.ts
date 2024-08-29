import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

export const fetchProfileData = createAsyncThunk<Profile, void, { rejectValue: string }>(
	'profile/fetchProfileData',
	async (_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ApiResponse<Profile>>('/users/myProfile');

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return response.data.data;
		} catch (error) {
			if (error.response && error.response?.status === 401) {
				thunkApi.dispatch(userActions.logout());
			}

			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
