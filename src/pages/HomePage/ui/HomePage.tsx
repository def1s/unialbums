import cls from './HomePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumsGrid } from 'widgets/AlbumsGrid';
import React from 'react';

interface HomePageProps {
    className?: string
}

export const HomePage = ({ className }: HomePageProps) => {

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<AlbumsGrid/>
		</div>
	);
};
