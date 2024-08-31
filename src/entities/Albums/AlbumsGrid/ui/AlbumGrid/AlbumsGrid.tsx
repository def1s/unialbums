import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IAlbum } from 'shared/types';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { AlbumCard } from '../AlbumCard/AlbumCard';
import cls from './AlbumsGrid.module.scss';

interface AlbumsGridProps {
    className?: string;
	albums?: IAlbum[];
	isLoading?: boolean;
	error?: string;
}

export const AlbumsGrid = (props: AlbumsGridProps) => {
	const {
		className,
		albums,
		isLoading,
		error
	} = props;

	const renderContent = () => {
		if (isLoading) {
			return <Loader/>;
		} else if (error) {
			return (
				<Text
					className={cls.message}
					title={'Произошла ошибка!'}
					text={error}
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
				/>
			);
		} else if (!albums || !albums.length) {
			return (
				<Text
					title="У вас нет ни одного альбома!"
					text="Вы можете добавить их в специальной форме в сайдбаре"
					align={TextAlign.CENTER}
					className={cls.message}
				/>
			);
		} else {
			return (
				albums.map((album) => (
					<AlbumCard
						key={album.albumId}
						{...album}
					/>
				))
			);
		}
	};

	return (
		<div className={classNames(cls.AlbumsGrid, {}, [className])}>
			{renderContent()}
		</div>
	);
};
