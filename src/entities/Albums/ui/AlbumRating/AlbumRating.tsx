import cls from './AlbumRating.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { IAlbumRating } from '../../model/types/album';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import React from 'react';
import { Loader } from 'shared/ui/Loader/Loader';

interface AlbumRatingProps {
	className?: string;
	readonly?: boolean;
	data?: IAlbumRating;
	isLoading?: boolean;
	error?: string;
	onChangeBitsRating: (value: string | number) => void;
	onChangeAtmosphereRating: (value: string | number) => void;
	onChangeTextRating: (value: string | number) => void;
	onChangeTracksRating: (value: string | number) => void;
	EditFeature?: React.ReactNode;
}

export const AlbumRating = (props: AlbumRatingProps) => {
	const {
		className,
		readonly,
		data,
		onChangeBitsRating,
		onChangeTextRating,
		onChangeAtmosphereRating,
		onChangeTracksRating,
		EditFeature,
		isLoading
	} = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.AlbumRating, {}, [className])}>
				<Loader/>
			</div>
		);
	}

	if (readonly) {
		return (
			<div className={classNames(cls.AlbumRating, {}, [className])}>
				<div className={cls.totalRating}>{data?.totalRating}</div>

				{EditFeature}
			</div>
		);
	} else {
		return (
			<div className={classNames(cls.AlbumRating, { [cls.edit]: !readonly }, [className])}>
				<div className={cls.rangeSlidersWrapper}>
					<label className={cls.sliderLabel}>Биты: {data?.bitsRating}</label>
					<RangeSlider
						className={cls.rangeSlider}
						value={data?.bitsRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'bitsRating'}
						onChange={onChangeBitsRating}
					/>

					<label className={cls.sliderLabel}>Атмосфера: {data?.atmosphereRating}</label>
					<RangeSlider
						value={data?.atmosphereRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'atmosphereRating'}
						onChange={onChangeAtmosphereRating}
					/>

					<label className={cls.sliderLabel}>Текста: {data?.textRating}</label>
					<RangeSlider
						value={data?.textRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'textRating'}
						onChange={onChangeTextRating}
					/>

					<label className={cls.sliderLabel}>Треки: {data?.tracksRating}</label>
					<RangeSlider
						value={data?.tracksRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'tracksRating'}
						onChange={onChangeTracksRating}
					/>
				</div>

				{EditFeature}
			</div>
		);
	}
};
