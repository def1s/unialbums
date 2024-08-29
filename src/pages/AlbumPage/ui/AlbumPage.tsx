import React from 'react';
import { AlbumDetails } from 'widgets/AlbumDetails';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AlbumPage.module.scss';

interface AlbumPageProps {
    className?: string
}

const AlbumPage = ({ className }: AlbumPageProps) => {

	return (
		<div className={classNames(cls.AlbumPage, {}, [className])}>
			{/*<EditAlbumDescription/>*/}
			{/*<EditableAlbumRating/>*/}
			<AlbumDetails/>
		</div>
	);
};

export default AlbumPage;
