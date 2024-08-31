import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from 'shared/types';
import { NotificationSchema } from '../types/notificationSchema';

const initialState: NotificationSchema = {
	notifications: []
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<INotification>) => {
			state.notifications.push(action.payload);
		},
		removeNotification: (state) => {
			state.notifications.shift();
		}
	}
});

export const { actions: notificationActions } = notificationSlice;
export const { reducer: notificationReducer } = notificationSlice;
