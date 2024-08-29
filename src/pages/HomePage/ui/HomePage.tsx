import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserAlbums } from 'widgets/UserAlbums';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getHomePageState } from '../model/selectors/getHomePageState/getHomePageState';
import { getAlbumsByAccessToken } from '../model/services/getAlbumsByAccessToken/getAlbumsByAccessToken';
import cls from './HomePage.module.scss';

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
