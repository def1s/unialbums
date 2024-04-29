import cls from './HomePage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { UserAlbums } from 'widgets/UserAlbums';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAlbumsByAccessToken } from '../model/services/getAlbumsByAccessToken/getAlbumsByAccessToken';
import { useSelector } from 'react-redux';
import { getHomePageState } from 'pages/HomePage/model/selectors/getHomePageState/getHomePageState';

interface HomePageProps {
    className?: string
}

const HomePage = ({ className }: HomePageProps) => {
	const dispatch = useAppDispatch();
	const { albums, isLoading, error } = useSelector(getHomePageState);

	useEffect(() => {
		dispatch(getAlbumsByAccessToken());
	}, [dispatch]);

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<UserAlbums
				albums={albums}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
};

export default HomePage;
