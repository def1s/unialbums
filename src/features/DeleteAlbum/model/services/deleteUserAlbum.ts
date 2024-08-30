import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from 'entities/Notification';
import { userActions } from 'entities/User';
import axiosInstance from 'shared/api/axiosConfig/axiosConfig';
import { ApiResponse } from 'shared/api/types/apiResponse';
import { NotificationTypes } from 'shared/types/notificationTypes';


// TODO перенести в фичи
export const deleteUserAlbum =
	createAsyncThunk<void, string>
	(
		'albumDescription/deleteUserAlbum',
		async (id, thunkApi) => {
			try {
				await axiosInstance.delete<ApiResponse<undefined>>(`/albums/${id}`);

				thunkApi.dispatch(notificationActions.addNotification({ message: 'Альбом удален' }));
			} catch (error) {
				if (error.response && error.response?.status === 401) {
					thunkApi.dispatch(userActions.logout());
				}

				thunkApi.dispatch(notificationActions.addNotification({ message: 'Ошибка удаления альбома', theme: NotificationTypes.ERROR }));
			}
		}
	);
