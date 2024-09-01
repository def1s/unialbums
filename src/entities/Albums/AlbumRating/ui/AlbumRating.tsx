import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IAlbumRating } from 'shared/types';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
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

	const renderContent = () => {
		if (isLoading) {
			return <Loader/>;
		} else if (error) {
			return (
				<Text
					className={cls.error}
					title={'Произошла ошибка!'}
					text={error}
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
				/>
			);
		} else {
			return (
				<>
					<div className={cls.totalRating}>{data?.totalRating}</div>

					<div className={cls.editBtn}>
						{EditFeature}
					</div>
				</>
			);
		}
	};

	return (
		<div className={classNames(cls.AlbumRating, {}, [className])}>
			{renderContent()}
		</div>
	);
};