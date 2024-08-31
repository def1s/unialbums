import React from 'react';
import { AlbumDescriptionCard } from 'widgets/AlbumDescriptionCard';
import { AlbumRatingCard } from 'widgets/AlbumRatingCard';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AlbumPage.module.scss';

interface AlbumPageProps {
    className?: string
}

const AlbumPage = ({ className }: AlbumPageProps) => {

	return (
		<div className={classNames(cls.AlbumPage, {}, [className])}>
			<AlbumDescriptionCard/>
			<AlbumRatingCard/>
		</div>
	);
};

export default AlbumPage;
