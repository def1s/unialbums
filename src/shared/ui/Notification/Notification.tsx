import React, { useState, useEffect } from 'react';
import cls from './Notification.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';

export enum NotificationTheme {
	PRIMARY = 'primary',
	SUCCESSFUL = 'successful',
	ERROR = 'error',
}

interface NotificationProps {
	className?: string;
	message?: string;
	theme?: NotificationTheme;
}

// TODO возможно стоит вынести уведомления на верхний слой для того, чтобы они не зависели ни от каких компонентов
export const Notification = (props: NotificationProps) => {
	const {
		className,
		message,
		theme = NotificationTheme.PRIMARY
	} = props;

	const [isVisible, setIsVisible] = useState(false);

	// показываем уведомление при монтировании компонента
	useEffect(() => {
		setIsVisible(true);

		// запускаем таймер для скрытия уведомления через 5 секунд
		const timeout = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		// очищаем таймер при размонтировании компонента
		return () => clearTimeout(timeout);
	}, []);

	const mods = {
		[cls.visible]: isVisible
	};

	return (
		<Portal>
			<div className={classNames(cls.Notification, mods, [className, cls[theme]])}>
				{message}
			</div>
		</Portal>
	);
};
