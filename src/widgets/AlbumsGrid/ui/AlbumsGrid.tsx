import cls from './AlbumsGrid.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumCard } from 'entities/AlbumCard';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, ThemeText } from 'shared/ui/Text/Text';
import { getUserAlbumsState } from '../model/selectors/getUserAlbumsState/getUserAlbumsState';
import { getAlbumsByAccessToken } from '../model/services/getAlbumsByAccessToken/getAlbumsByAccessToken';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AlbumsListProps {
    className?: string
}

export const AlbumsGrid = memo(({ className }: AlbumsListProps) => {
	const { albums, isLoading, error } = useSelector(getUserAlbumsState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAlbumsByAccessToken());
	}, [dispatch]);

	return (
		<div className={classNames(cls.AlbumsGrid, {}, [className])}>
			{ isLoading && !error && <Loader/> }

			{
				!isLoading && error &&
				<Text title={error} text={'Попробуйте перезагрузить страницу'} theme={ThemeText.ERROR}/>
			}

			{
				albums && albums.map((album) => (
					<AlbumCard
						key={album.albumId}
						albumId={album.albumId}
						cover={album.cover}
						title={album.title}
						artist={album.artist}
					/>
				))
			}
		</div>
	);
});
