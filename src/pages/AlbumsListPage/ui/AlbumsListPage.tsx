import cls from './AlbumsListPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumsGrid } from 'widgets/AlbumsGrid';
import React from 'react';

interface AlbumsListPageProps {
    className?: string
}

export const AlbumsListPage = ({ className }: AlbumsListPageProps) => {

	return (
		<div className={classNames(cls.AlbumsListPage, {}, [className])}>
			<AlbumsGrid/>
		</div>
	);
};
