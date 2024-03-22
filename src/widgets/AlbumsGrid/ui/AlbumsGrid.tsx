import cls from './AlbumsGrid.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumCard } from 'entities/AlbumCard';
import React from 'react';

interface AlbumsListProps {
    className?: string
}

export const AlbumsGrid = ({ className }: AlbumsListProps) => {

	return (
		<div className={classNames(cls.AlbumsGrid, {}, [className])}>
			<AlbumCard
				id={1}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/>
			<AlbumCard
				id={2}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/>
			<AlbumCard
				id={3}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/>
			<AlbumCard
				id={3}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/>
			<AlbumCard
				id={3}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/>
			<AlbumCard
				id={3}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/><AlbumCard
				id={3}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/><AlbumCard
				id={3}
				cover="https://via.placeholder.com/150"
				title="Album title"
				artist="Artist name"
				rating={5}
			/>



		</div>
	);
};
