import cls from './SearchAlbumsByName.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';

interface SearchAlbumsByNameProps {
    className?: string
}

export const SearchAlbumsByName = ({ className }: SearchAlbumsByNameProps) => {

	return (
		<input
			className={classNames(cls.SearchAlbumsByName, {}, [className])}
			type='text'
			placeholder='Поиск альбома'
		>
		</input>
	);
};
