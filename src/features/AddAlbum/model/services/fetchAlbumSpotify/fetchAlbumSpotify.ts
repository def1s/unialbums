import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from 'entities/Notification';
import { SearchFieldItem } from 'entities/SearchAlbums';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { NotificationTypes } from 'shared/types/notificationTypes';

interface GetAlbumSpotifyProps {
	albumId: string;
}

export const fetchAlbumSpotify = createAsyncThunk<
	SearchFieldItem,
	GetAlbumSpotifyProps,
	{ rejectValue: string }
>(
	'albumForm/fetchAlbumSpotify',
	async ({ albumId }, thunkAPI) => {
		try {
			const response =
				await axiosInstance.get<ApiResponse<SearchFieldItem>>(`/spotify/album/${albumId}`);

			return response.data.data;
		} catch (error) {
			const errorMessage = error.response.data.message || 'Непредвиденная ошибка';

			thunkAPI.dispatch(notificationActions.addNotification({
				message: errorMessage,
				theme: NotificationTypes.ERROR
			}));

			return thunkAPI.rejectWithValue(errorMessage);
		}
	});