import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { AlbumsGrid } from 'widgets/AlbumsGrid';
import React from 'react';
import { Navbar } from 'widgets/Navbar';

interface MainPageProps {
    className?: string
}

export const MainPage: FC<MainPageProps> = (props) => {
	const {
		className
	} = props;

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<AlbumsGrid/>
		</div>
	);
};
