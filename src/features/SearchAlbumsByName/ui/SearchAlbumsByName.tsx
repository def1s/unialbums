import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import cls from './SearchAlbumsByName.module.scss';

interface SearchAlbumsByNameProps {
    className?: string
}

export const SearchAlbumsByName = ({ className }: SearchAlbumsByNameProps) => {

	return (
		<Input
			className={classNames(cls.SearchAlbumsByName, {}, [className])}
			type='text'
			placeholder='Поиск альбома'
		/>
	);
};
