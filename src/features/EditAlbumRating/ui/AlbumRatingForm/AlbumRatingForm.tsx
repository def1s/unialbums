import { FormEvent, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbumRatingRating } from 'entities/Albums/AlbumRating';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { getAlbumRatingFormRating } from '../../model/selectors/selectors';
import { updateAlbumRating } from '../../model/services/updateAlbumRating/updateAlbumRating';
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

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const formRating = useSelector(getAlbumRatingFormRating);
	const dataRating = useSelector(getAlbumRatingRating);

	useEffect(() => {
		if (dataRating) {
			dispatch(albumRatingFormActions.initAlbumRatingForm(dataRating));
		}
	}, [dispatch, dataRating]);

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

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateAlbumRating(id || ''));
	};

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<form
				className={classNames(cls.AlbumRatingForm, {}, [className])}
				onSubmit={onSubmit}
			>
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
					className={cls.rangeSlider}
					value={formRating?.atmosphereRating || 1}
					defaultValue={1}
					min={1}
					max={10}
					name={'atmosphereRating'}
					onChange={onChangeAtmosphereRating}
				/>

				<label className={cls.sliderLabel}>Текста: {formRating?.textRating}</label>
				<RangeSlider
					className={cls.rangeSlider}
					value={formRating?.textRating || 1}
					defaultValue={1}
					min={1}
					max={10}
					name={'textRating'}
					onChange={onChangeTextRating}
				/>

				<label className={cls.sliderLabel}>Треки: {formRating?.tracksRating}</label>
				<RangeSlider
					className={cls.rangeSlider}
					value={formRating?.tracksRating || 1}
					defaultValue={1}
					min={1}
					max={10}
					name={'tracksRating'}
					onChange={onChangeTracksRating}
				/>

				<Button className={cls.submitBtn}>Сохранить</Button>
			</form>
		</DynamicModuleLoader>
	);
};
