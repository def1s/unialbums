import cls from './UserAlbums.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { AlbumsGrid } from 'entities/Albums/ui/AlbumsGrid/AlbumsGrid';
import { Album } from 'entities/Albums';

interface UserAlbumsProps {
	albums: Album[];
	isLoading?: boolean;
	error?: string;
    className?: string
}

export const UserAlbums = memo((props: UserAlbumsProps) => {
	const {
		albums,
		isLoading,
		error,
		className
	} = props;

	return (
		<div className={classNames(cls.UserAlbums, {}, [className])}>
			{ isLoading && !error && <Loader/> }

			{
				!isLoading && error &&
				<Text title={error} text={'Попробуйте перезагрузить страницу'} theme={TextTheme.ERROR}/>
			}

			{
				albums.length === 0 && !isLoading && !error &&
				<Text
					title={'У вас нет ни одного альбома!'}
					text={'Вы можете добавить их в специальной форме (в сайдбаре)'}
					align={TextAlign.CENTER}
					className={cls.message}
				/>
			}

			<AlbumsGrid albums={albums}/>
		</div>
	);
});
