import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../../../../entities/Profile/model/types/profile';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';

export const fetchProfileData = createAsyncThunk<Profile, void, { rejectValue: string }>(
	'profile/fetchProfileData',
	async (_, thunkApi) => {
		try {
			const response = await axiosInstance.get<ApiResponse<Profile>>('/profile');

			if (!response.data) {
				throw new Error('Что-то пошло не так');
			}

			return response.data.data[0];
		} catch (error) {
			if (error.response && error.response?.status === 403) {
				thunkApi.dispatch(userActions.logout());
			}

			return thunkApi.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
