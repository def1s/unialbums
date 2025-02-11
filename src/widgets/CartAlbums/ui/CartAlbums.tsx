import React, { memo } from 'react';
import {
	AlbumsGrid,
	albumsGridReducer,
} from 'entities/Albums/AlbumsGrid';
import { useAlbumsCart } from 'entities/Cart';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './CartAlbums.module.scss';

interface UserAlbumsProps {
	userId?: number;
    className?: string;
}

const initialReducer: ReducerList = {
	albumsGrid: albumsGridReducer
};

export const CartAlbums = memo((props: UserAlbumsProps) => {
	const {
		className,
	} = props;

	const { cartContent } = useAlbumsCart('');

	return (
		<DynamicModuleLoader reducers={initialReducer} removeAfterUnmount>
			<div className={classNames(cls.UserAlbums, {}, [className])}>

				<AlbumsGrid
					albums={cartContent}
					isLoading={false}
					error={''}
					isCart={true}
				/>

			</div>
		</DynamicModuleLoader>
	);
});
