import React from 'react';
import { AlbumCategories } from 'widgets/AlbumCategories';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './HomePage.module.scss';

interface HomePageProps {
    className?: string
}

const HomePage = ({ className }: HomePageProps) => {

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<div className={cls.wrapper}>
				Альбомы по категориям
			</div>
			{/*<CartAlbums className={cls.userAlbums}/>*/}
			<AlbumCategories />
		</div>
	);
};

export default HomePage;
