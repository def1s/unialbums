import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAlbumFormData } from '../../selectors/getAlbumFormData/getAlbumFormData';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { SearchFieldItem } from 'entities/SearchAlbums';
import axios from 'axios';

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