import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNotifications, notificationActions } from 'entities/Notification';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToastNotification } from 'shared/ui/ToastNotification/ToastNotification';
import cls from './Notifications.module.scss';

interface NotificationsProps {
    className?: string;
}

export const Notifications = (props: NotificationsProps) => {
	const {
		className
	} = props;

	const dispatch = useAppDispatch();
	const notifications = useSelector(getNotifications);

	useEffect(() => {
		if (notifications.length > 0) {
			const timer = setTimeout(() => {
				dispatch(notificationActions.removeNotification());
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [dispatch, notifications]);

	console.log(notifications);

	return (
		<div className={classNames(cls.Notifications, {}, [className])}>
			{notifications.map(({ message, theme }, index) => (
				<ToastNotification message={message} theme={theme} key={index}/>
			))}
		</div>
	);
};
