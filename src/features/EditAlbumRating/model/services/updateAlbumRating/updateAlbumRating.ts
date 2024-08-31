import { createAsyncThunk } from '@reduxjs/toolkit';
import { albumRatingActions } from 'entities/Albums/AlbumRating';
import { notificationActions } from 'entities/Notification';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { IAlbumRating } from 'shared/types';
import { NotificationTypes } from 'shared/types/notificationTypes';
import { getAlbumRatingFormRating } from '../../selectors/selectors';

export const updateAlbumRating =
	createAsyncThunk<void, string, { rejectValue: string }>
	(
		'editAlbumRating/updateAlbumRating',
		async (id, thunkAPI) => {
			// @ts-expect-error отсутствует типизация для thunk
			const ratingSliders = getAlbumRatingFormRating(thunkAPI.getState());

			try {
				const response =
					await axiosInstance.put<ApiResponse<IAlbumRating>>(`/albums/rating/${id}`, ratingSliders);

				if (!response.data) {
					throw new Error('Что-то пошло нет так');
				}

				thunkAPI.dispatch(notificationActions.addNotification({ message: 'Данные успешно обновлены' }));
				thunkAPI.dispatch(albumRatingActions.updateAlbumRating(response.data.data));
			} catch (error) {
				if (error.response && error.response?.status === 401) {
					thunkAPI.dispatch(userActions.logout());
				}

				const errorMessage = error.response.data.message || 'Непредвиденная ошибка';

				thunkAPI.dispatch(notificationActions.addNotification({ message: errorMessage, theme: NotificationTypes.ERROR }));
				return thunkAPI.rejectWithValue(errorMessage);
			}
		}
	);