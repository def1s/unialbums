import React from 'react';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { classNames } from 'shared/lib/classNames/classNames';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { INotification } from 'shared/types';
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { NotificationTypes } from 'shared/types/notificationTypes';
import cls from './ToastNotification.module.scss';

interface ToastNotificationProps extends INotification {
	className?: string;
}

export const ToastNotification = (props: ToastNotificationProps) => {
	const {
		message,
		className,
		theme = NotificationTypes.SUCCESS
	} = props;
	
	return (
		<div className={classNames(cls.ToastNotification, {}, [className, cls[theme]])}>
			{message}
		</div>
	);
};
