import cls from './AlbumPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { AlbumOverview } from 'widgets/AlbumOverview';

interface AlbumPageProps {
    className?: string
}

const AlbumPage = ({ className }: AlbumPageProps) => {

	return (
		<div className={classNames(cls.AlbumPage, {}, [className])}>
			<AlbumOverview/>
		</div>
	);
};

export default AlbumPage;
