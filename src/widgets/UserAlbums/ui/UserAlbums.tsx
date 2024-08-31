import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAlbumDescriptionError, getAlbumDescriptionIsLoading } from 'entities/Albums/AlbumDescription';
import {
	AlbumsGrid,
	albumsGridReducer,
	fetchAlbumsByAccessToken,
	fetchAlbumsByUserId,
	getAlbumsGridAlbums
} from 'entities/Albums/AlbumsGrid';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
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

	const isLoading = useSelector(getAlbumDescriptionIsLoading);
	const error = useSelector(getAlbumDescriptionError);
	const albums = useSelector(getAlbumsGridAlbums);

	const renderContent = () => {
		if (isLoading) {
			return <Loader />;
		}

		if (error) {
			return <Text title={error} text="Попробуйте перезагрузить страницу" theme={TextTheme.ERROR} />;
		}

		if (!albums?.length) {
			return (
				<Text
					title="У вас нет ни одного альбома!"
					text="Вы можете добавить их в специальной форме (в сайдбаре)"
					align={TextAlign.CENTER}
					className={cls.message}
				/>
			);
		}

		return <AlbumsGrid albums={albums} />;
	};

	return (
		<DynamicModuleLoader reducers={initialReducer} removeAfterUnmount>
			<div className={classNames(cls.UserAlbums, {}, [className])}>
				{renderContent()}
			</div>
		</DynamicModuleLoader>
	);
});
