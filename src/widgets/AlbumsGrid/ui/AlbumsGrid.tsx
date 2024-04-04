import cls from './AlbumsGrid.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumCard } from 'entities/AlbumCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, ThemeText } from 'shared/ui/Text/Text';
import { getUserAlbumsState } from '../model/selectors/getUserAlbumsState/getUserAlbumsState';
import { getAlbumsByAccessToken } from '../model/services/getAlbumsByAccessToken/getAlbumsByAccessToken';

interface AlbumsListProps {
    className?: string
}

export const AlbumsGrid = ({ className }: AlbumsListProps) => {
	const { albums, isLoading, error } = useSelector(getUserAlbumsState);
	const dispatch = useDispatch();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
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
};
