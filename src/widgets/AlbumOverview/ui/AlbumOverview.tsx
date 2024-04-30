import cls from './AlbumOverview.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { EditableAlbumDescription } from 'features/EditableAlbumDescription';
import { useSelector } from 'react-redux';
import {
	getAlbumDescriptionForm
} from 'features/EditableAlbumDescription';

interface AlbumOverviewProps {
    className?: string
}

export const AlbumOverview = memo(({ className }: AlbumOverviewProps) => {
	const data = useSelector(getAlbumDescriptionForm);

	return (
		<div
			className={classNames(cls.AlbumOverview, {}, [className])}
		>
			<div className={cls.backgroundImage}>
				<img src={data?.cover} alt="cover album"/>
			</div>

			<EditableAlbumDescription/>
		</div>
	);
});
