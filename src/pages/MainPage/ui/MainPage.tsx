import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';

interface MainPageProps {
    className?: string
}

export const MainPage: FC<MainPageProps> = (props) => {
	const {
		className
	} = props;

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			Main Page
		</div>
	);
};
