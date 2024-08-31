import React from 'react';
import { UserAlbums } from 'widgets/UserAlbums';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './HomePage.module.scss';

interface HomePageProps {
    className?: string
}

const HomePage = ({ className }: HomePageProps) => {

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<UserAlbums/>
		</div>
	);
};

export default HomePage;
