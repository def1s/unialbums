import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { SearchFieldItem } from 'entities/SearchAlbums';

interface GetAlbumSpotifyProps {
	albumId: string;
}

export const getAlbumSpotify = createAsyncThunk<
	SearchFieldItem,
	GetAlbumSpotifyProps,
	{ rejectValue: string }
>(
	'albumForm/getAlbumSpotify',
	async ({ albumId }, thunkAPI) => {
		try {
			const response =
				await axiosInstance.get<ApiResponse<SearchFieldItem>>(`/spotify/album/${albumId}`);

			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	});