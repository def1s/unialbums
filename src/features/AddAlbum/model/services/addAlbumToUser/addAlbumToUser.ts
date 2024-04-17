import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { Album } from 'entities/Albums';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';

interface LoginByUsernameProps extends Omit<Album, 'albumId'> {}
interface LoginByUsernameResult {
	message: string;
}

export const addAlbumToUser = createAsyncThunk<LoginByUsernameResult, LoginByUsernameProps, { rejectValue: string }>(
	'albumForm/addAlbumToUser',
	async (albumData, thunkAPI) => {
		const formData = new FormData();
		const { cover, ...otherAlbumData } = albumData;

		try {
			const blobImg = await fetch(cover).then(res => res.blob());
			formData.append('cover', blobImg);

			Object.entries(otherAlbumData).forEach(([name, value]) => {
				formData.append(name, String(value));
			});

			const response = await axiosInstance.post<ApiResponse<null>>('/albums/create', formData);
			return { message: response.data.message };
		} catch (error) {
			if (error.response && error.response.status === 403) {
				thunkAPI.dispatch(userActions.logout());
			}

			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	}
);
