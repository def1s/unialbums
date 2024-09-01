import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchFieldItem } from 'entities/SearchAlbums';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { getAlbumFormData } from '../../selectors/getAlbumFormData/getAlbumFormData';

interface SearchAlbumsSpotifyProps {
	signal: AbortSignal
}

export const searchAlbumsSpotify = createAsyncThunk<
    SearchFieldItem[],
	SearchAlbumsSpotifyProps,
    { rejectValue: string }
>(
	'albumForm/searchAlbumsSpotify',
	async ({ signal }, thunkAPI) => {
		try {
			/**
			 * для отмены предыдущих запросов
			 * пользователь может быстро вводить название или сервис долго отвечать, поэтому
			 * отменяем запросы, ответ которых нам уже не нужен
			 */
			const source = axios.CancelToken.source();
			signal.addEventListener('abort', () => {
				source.cancel('Запрос отменен');
			});

			// @ts-expect-error отсутствует типизация для thunk
			const albumForm = getAlbumFormData(thunkAPI.getState());

			if (!albumForm?.title?.length) {
				return [];
			}

			const response =
                await axiosInstance.get<ApiResponse<SearchFieldItem[]>>(`/spotify/search/${albumForm.title}`, { cancelToken: source.token });
            
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message || 'Непредвиденная ошибка');
		}
	});