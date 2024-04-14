import cls from './AlbumForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { albumFormActions, albumFormReducer } from '../../model/slice/albumFormSlice';
import { AlbumFormFields } from '../../model/types/albumFormSchema';
import { getAlbumFormTitle } from '../../model/selectors/getAlbumFormTitle/getAlbumFormTitle';
import { getAlbumFormArtist } from '../../model/selectors/getAlbumFormArtist/getAlbumFormArtist';
import {
	getAlbumFormAtmosphereRating
} from '../../model/selectors/getAlbumFormAtmosphereRating/getAlbumFormAtmosphereRating';
import { getAlbumFormBitsRating } from '../../model/selectors/getAlbumFormBitsRating/getAlbumFormBitsRating';
import { getAlbumFormTextRating } from '../../model/selectors/getAlbumFormTextRating/getAlbumFormTextRating';
import {
	getAlbumFormTracksRating
} from '../../model/selectors/getAlbumFormTracksRating/getAlbumFormTracksRating';
import { addAlbumToUser } from '../../model/services/addAlbumToUser/addAlbumToUser';
import { getAlbumFormCover } from '../../model/selectors/getAlbumFormCover/getAlbumFormCover';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { InputFile } from 'shared/ui/InputFile/InputFile';
import { Button } from 'shared/ui/Button/Button';

interface AlbumFormProps {
    className?: string
}

const initialReducers: ReducerList = {
	albumForm: albumFormReducer
};

export const AlbumForm = ({ className }: AlbumFormProps) => {
	const dispatch = useDispatch();

	const title = useSelector(getAlbumFormTitle);
	const artist = useSelector(getAlbumFormArtist);
	const atmosphereRating = useSelector(getAlbumFormAtmosphereRating);
	const bitsRating = useSelector(getAlbumFormBitsRating);
	const textRating = useSelector(getAlbumFormTextRating);
	const tracksRating = useSelector(getAlbumFormTracksRating);
	const cover = useSelector(getAlbumFormCover);

	const localUrlImage = useRef('');

	// очищение URL после размонтирования компонента
	useEffect(() => {
		return () => {
			URL.revokeObjectURL(localUrlImage.current);
		};
	}, []);

	const onChangeField = (value: number | string, field: AlbumFormFields) => {
		dispatch(albumFormActions.setFieldValue({ value: value, field: field }));
	};

	const onCoverAdd = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.target;

		localUrlImage.current = window.URL.createObjectURL(files[0]);

		onChangeField(localUrlImage.current, 'cover');
	};

	const onCoverDelete = () => {
		URL.revokeObjectURL(localUrlImage.current);
		localUrlImage.current = '';
		onChangeField('', 'cover');
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// eslint-disable-next-line
		// @ts-expect-error
		dispatch(addAlbumToUser({ cover, title, tracksRating, atmosphereRating, textRating, bitsRating, artist }));
	};

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<form
				className={classNames(cls.AlbumForm, {}, [className])}
				onSubmit={(e) => onSubmit(e)}
			>
				<div className={cls.info}>
					<InputFile
						onChange={onCoverAdd}
						selectedFile={cover}
						onRemove={onCoverDelete}
						label='Обложка'
					/>
					<div className={cls.descriptionWrapper}>
						<Input
							type="text"
							name="title"
							className={cls.formInput}
							onChange={onChangeField}
							value={title}
							placeholder='Название альбома'
							required
						/>

						<Input
							type="text"
							name="artist"
							className={cls.formInput}
							onChange={onChangeField}
							value={artist}
							placeholder='Исполнитель'
							required
						/>
					</div>
				</div>

				<div className={cls.ratingWrapper}>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Атмосфера: {atmosphereRating}</label>
						<RangeSlider
							className={cls.rangeSlider}
							value={atmosphereRating}
							onChange={onChangeField}
							min={1}
							max={10}
							defaultValue={1}
							name={'atmosphereRating'}
						/>
					</div>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Текста: {textRating}</label>
						<RangeSlider
							className={cls.rangeSlider}
							value={textRating}
							onChange={onChangeField}
							min={1}
							max={10}
							defaultValue={1}
							name={'textRating'}
						/>
					</div>
				</div>

				<div className={cls.ratingWrapper}>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Биты: {bitsRating}</label>
						<RangeSlider
							value={bitsRating}
							onChange={onChangeField}
							min={1}
							max={10}
							defaultValue={1}
							name={'bitsRating'}
						/>
					</div>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Треки: {tracksRating}</label>
						<RangeSlider
							value={tracksRating}
							onChange={onChangeField}
							min={1}
							max={10}
							defaultValue={1}
							name={'tracksRating'}
						/>
					</div>
				</div>
				<Button type="submit" className={cls.formSubmit}>Добавить альбом</Button>
			</form>
		</DynamicModuleLoader>
	);
};
