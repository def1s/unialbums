export enum NotificationTypes {
	ERROR = 'error',
	SUCCESS = 'success'
}

export interface INotification {
	message: string;
	theme?: NotificationTypes;
}