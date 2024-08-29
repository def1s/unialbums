import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { userActions } from 'entities/User';
import { IAlbumDescription } from 'entities/Albums';

interface FetchAlbumDescriptionProps {
	id?: string | number;
}

export const fetchAlbumDescription =
	createAsyncThunk<IAlbumDescription, FetchAlbumDescriptionProps, { rejectValue: string }>
	(
		'albumDescription/fetchAlbumDescription',
		async ({ id }, thunkApi) => {
			try {
				const response = await axiosInstance.get<ApiResponse<IAlbumDescription>>(`/albums/description/${id}`);

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
