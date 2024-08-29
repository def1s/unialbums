import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IAlbum } from 'shared/types';
import { AlbumCard } from '../AlbumCard/AlbumCard';
import cls from './AlbumsGrid.module.scss';

interface AlbumsGridProps {
    className?: string;
	albums: IAlbum[];
}

export const AlbumsGrid = ({ className, albums }: AlbumsGridProps) => {

	// TODO перенести model в entities

	return (
		<div className={classNames(cls.AlbumsGrid, {}, [className])}>
			{
				albums && albums.map((album) => (
					<AlbumCard
						key={album.albumId}
						{...album}
					/>
				))
			}
		</div>
	);
};
