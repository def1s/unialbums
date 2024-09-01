import { StateSchema } from 'app/providers/StoreProvider';

export const getNotifications = (state: StateSchema) => state.notification.notifications;