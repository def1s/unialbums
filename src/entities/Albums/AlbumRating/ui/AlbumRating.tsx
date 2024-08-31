import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IAlbumRating } from 'shared/types';
import { Loader } from 'shared/ui/Loader/Loader';
import cls from './AlbumRating.module.scss';

interface AlbumRatingProps {
	className?: string;
	readonly?: boolean;
	data?: IAlbumRating;
	isLoading?: boolean;
	error?: string;
	EditFeature?: ReactNode;
}

export const AlbumRating = (props: AlbumRatingProps) => {
	const {
		className,
		data,
		isLoading,
		error,
		EditFeature
	} = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.AlbumRating, {}, [className])}>
				<Loader/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.AlbumRating, {}, [className])}>
			<div className={cls.totalRating}>{data?.totalRating}</div>

			{EditFeature}
		</div>
	);
};