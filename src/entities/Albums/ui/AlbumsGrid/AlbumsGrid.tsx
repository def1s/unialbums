import cls from './AlbumsGrid.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Album, AlbumCard } from 'entities/Albums';
import React from 'react';

interface AlbumsGridProps {
    className?: string;
	albums: Album[];
}

export const AlbumsGrid = ({ className, albums }: AlbumsGridProps) => {

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
