import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchFieldItem } from 'entities/SearchAlbums';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';

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
			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	});