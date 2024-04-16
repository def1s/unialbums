import cls from './HomePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumsGrid } from 'widgets/AlbumsGrid';
import React from 'react';

interface HomePageProps {
    className?: string
}

const HomePage = ({ className }: HomePageProps) => {

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<AlbumsGrid/>
		</div>
	);
};

export default HomePage;
