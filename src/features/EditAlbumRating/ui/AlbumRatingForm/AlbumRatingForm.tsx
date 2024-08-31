import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getAlbumRatingRating } from 'entities/Albums/AlbumRating';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { albumRatingFormActions, albumRatingFormReducer } from '../../model/slice/albumRatingFormSlice';
import cls from './AlbumRatingForm.module.scss';

interface AlbumRatingFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
	albumRatingForm: albumRatingFormReducer
};

export const AlbumRatingForm = (props: AlbumRatingFormProps) => {
	const {
		className
	} = props;

	const dispatch = useAppDispatch();

	const formRating = useSelector(getAlbumRatingRating);

	const onChangeTracksRating = useCallback((tracksRating: string | number) => {
		dispatch(albumRatingFormActions.updateAlbumRatingForm({ tracksRating: +tracksRating }));
	}, [dispatch]);

	const onChangeBitsRating = useCallback((bitsRating: string | number) => {
		dispatch(albumRatingFormActions.updateAlbumRatingForm({ bitsRating: +bitsRating }));
	}, [dispatch]);

	const onChangeTextRating = useCallback((textRating: string | number) => {
		dispatch(albumRatingFormActions.updateAlbumRatingForm({ textRating: +textRating }));
	}, [dispatch]);

	const onChangeAtmosphereRating = useCallback((atmosphereRating: string | number) => {
		dispatch(albumRatingFormActions.updateAlbumRatingForm({ atmosphereRating: +atmosphereRating }));
	}, [dispatch]);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.AlbumRatingForm, {}, [className])}>
				<div className={cls.rangeSlidersWrapper}>
					<label className={cls.sliderLabel}>Биты: {formRating?.bitsRating}</label>
					<RangeSlider
						className={cls.rangeSlider}
						value={formRating?.bitsRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'bitsRating'}
						onChange={onChangeBitsRating}
					/>

					<label className={cls.sliderLabel}>Атмосфера: {formRating?.atmosphereRating}</label>
					<RangeSlider
						value={formRating?.atmosphereRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'atmosphereRating'}
						onChange={onChangeAtmosphereRating}
					/>

					<label className={cls.sliderLabel}>Текста: {formRating?.textRating}</label>
					<RangeSlider
						value={formRating?.textRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'textRating'}
						onChange={onChangeTextRating}
					/>

					<label className={cls.sliderLabel}>Треки: {formRating?.tracksRating}</label>
					<RangeSlider
						value={formRating?.tracksRating || 1}
						defaultValue={1}
						min={1}
						max={10}
						name={'tracksRating'}
						onChange={onChangeTracksRating}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	);
};
