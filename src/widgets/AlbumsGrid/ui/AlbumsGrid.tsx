import cls from './AlbumsGrid.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumCard } from 'entities/AlbumCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbumsState } from 'entities/AlbumCard';
import { getAlbumsByAccessToken } from 'entities/AlbumCard';
import { Loader } from 'shared/ui/Loader/Loader';

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

			{ !isLoading && error }

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
