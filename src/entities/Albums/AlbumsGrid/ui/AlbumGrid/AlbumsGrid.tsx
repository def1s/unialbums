import React, { memo } from 'react';
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
	isCart?: boolean;
}

export const AlbumsGrid = memo((props: AlbumsGridProps) => {
	const {
		className,
		albums,
		isLoading,
		error,
		isCart
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
					title={isCart ? 'Корзина пуста' : 'В этой категории нет ни одного альбома!'}
					text={isCart ? 'Сначала добавьте пластинки' : 'Подождите, когда администратор добавит новые пластинки'}
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
});
