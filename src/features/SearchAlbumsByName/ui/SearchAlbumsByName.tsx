import cls from './SearchAlbumsByName.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { Input } from 'shared/ui/Input/Input';

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
