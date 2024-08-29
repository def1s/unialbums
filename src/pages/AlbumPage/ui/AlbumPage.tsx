import cls from './AlbumPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { AlbumDetails } from 'widgets/AlbumDetails/ui/AlbumDetails';

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
