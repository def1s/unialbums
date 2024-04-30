import cls from './AlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode, useMemo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { Input, ThemeInput } from 'shared/ui/Input/Input';
import { Album } from '../../model/types/album';
import { Loader } from 'shared/ui/Loader/Loader';
import { Blur } from 'shared/ui/Blur/Blur';
import { calculateRating } from 'shared/lib/calculateRating/calculateRating';
import { RATING_ALBUMS_MULTIPLIER } from 'shared/const/global';

interface AlbumDescriptionProps {
	data?: Album;
	className?: string;
	readonly?: boolean;
	isLoading?: boolean;
	onChangeTitle?: (value: string) => void;
	onChangeArtist?: (value: string) => void;
	EditFeature?: ReactNode;
}

export const AlbumDescription = memo((props: AlbumDescriptionProps): React.ReactNode => {
	const {
		data,
		className,
		readonly = true,
		isLoading,
		EditFeature,
		onChangeArtist,
		onChangeTitle
	} = props;

	const rating = useMemo(() => calculateRating(
		RATING_ALBUMS_MULTIPLIER,
		data?.tracksRating || 1,
		data?.atmosphereRating || 1,
		data?.bitsRating || 1,
		data?.textRating || 1
	), [data?.atmosphereRating, data?.bitsRating, data?.textRating, data?.tracksRating]);

	if (isLoading) {
		return (
			<div className={classNames(cls.AlbumDescription, {}, [className])}>
				<Loader/>
				<Blur/>
			</div>
		);
	}

	if (readonly) {
		return (
			<div className={classNames(cls.AlbumDescription, {}, [className])}>
				<div className={cls.cover}>
					{/* Отображение обложки альбома */}
					<img src={data?.cover} alt="Обложка альбома"/>
				</div>

				{/* Отображение информации об альбоме с валидацией на длину некоторых полей */}
				<div className={cls.wrapper}>
					<div className={cls.title}>{textLengthValidation(data?.title || '', 25)}</div>
					<div className={cls.artist}>{textLengthValidation(data?.artist || '', 25)}</div>
					{/*<div className={cls.year}>{data.year}</div>*/}
					<div className={cls.rating}>{rating}</div>
				</div>

				<div className={cls.editButtons}>
					{EditFeature}
				</div>
			</div>
		);
	} else {
		return (
			<div className={classNames(cls.AlbumDescription, {}, [className])}>
				<div className={cls.cover}>
					{/* Отображение обложки альбома */}
					<img src={data?.cover} alt="Обложка альбома"/>
				</div>

				<div className={cls.wrapper}>
					<Input
						className={cls.title}
						value={data?.title}
						theme={ThemeInput.ONLY_BOTTOM_BORDER}
						onChange={onChangeTitle}
					/>

					<Input
						className={cls.artist}
						value={data?.artist}
						theme={ThemeInput.ONLY_BOTTOM_BORDER}
						onChange={onChangeArtist}
					/>
				</div>

				<div className={cls.editButtons}>
					{EditFeature}
				</div>
			</div>
		);
	}
});
