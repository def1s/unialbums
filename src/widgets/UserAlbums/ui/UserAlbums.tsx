import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	AlbumsGrid,
	albumsGridReducer,
	fetchAlbumsByAccessToken,
	fetchAlbumsByUserId,
	getAlbumsGridAlbums, getAlbumsGridError, getAlbumsGridIsLoading
} from 'entities/Albums/AlbumsGrid';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './UserAlbums.module.scss';

interface UserAlbumsProps {
	userId?: number;
    className?: string;
}

const initialReducer: ReducerList = {
	albumsGrid: albumsGridReducer
};

export const UserAlbums = memo((props: UserAlbumsProps) => {
	const {
		userId,
		className
	} = props;

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userId) {
			dispatch(fetchAlbumsByAccessToken());
		} else {
			dispatch(fetchAlbumsByUserId(userId));
		}
	}, [userId, dispatch]);

	const isLoading = useSelector(getAlbumsGridIsLoading);
	const error = useSelector(getAlbumsGridError);
	const albums = useSelector(getAlbumsGridAlbums);

	return (
		<DynamicModuleLoader reducers={initialReducer} removeAfterUnmount>
			<div className={classNames(cls.UserAlbums, {}, [className])}>

				<AlbumsGrid
					albums={albums}
					isLoading={isLoading}
					error={error}
				/>

			</div>
		</DynamicModuleLoader>
	);
});
