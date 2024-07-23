import cls from './AlbumPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { EditableAlbumDescription } from 'features/EditableAlbumDescription';
import { EditableAlbumRating } from 'features/EditableAlbumRating';

interface AlbumPageProps {
    className?: string
}

const AlbumPage = ({ className }: AlbumPageProps) => {

	return (
		<div className={classNames(cls.AlbumPage, {}, [className])}>
			<EditableAlbumDescription/>
			<EditableAlbumRating/>
		</div>
	);
};

export default AlbumPage;
