import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IProfile } from 'shared/types';

export const fetchPersonalProfileData = createAsyncThunk<IProfile, void, { rejectValue: string }>(
	'profile/fetchPersonalProfileData',
	async (_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ApiResponse<IProfile>>('/users/myProfile');

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
