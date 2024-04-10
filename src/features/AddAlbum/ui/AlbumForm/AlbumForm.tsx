import cls from './AlbumForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import { ChangeEvent, FormEvent } from 'react';
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

	const onChange = (value: number | string, field: AlbumFormFields) => {
		dispatch(albumFormActions.setFieldValue({ value: value, field: field }));
	};

	const onCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.target;

		const localImageUrl = window.URL.createObjectURL(files[0]);

		onChange(localImageUrl, 'cover');
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
				<div className={cls.formGroup}>
					<label className={cls.formLabel}>Название альбома:</label>
					<Input
						type="text"
						name="title"
						className={cls.formInput}
						onChange={onChange}
						value={title}
						required
					/>
				</div>
				<div className={cls.formGroup}>
					<label className={cls.formLabel}>Исполнитель:</label>
					<Input
						type="text"
						name="artist"
						className={cls.formInput}
						onChange={onChange}
						value={artist}
						required
					/>
				</div>
				<div className={cls.formGroup}>
					<label className={cls.formLabel}>Обложка:</label>
					<input
						type='file'
						onChange={e => onCoverChange(e)}
					/>
				</div>
				<div className={cls.formGroup}>
					<label className={cls.formLabel}>Атмосфера: {atmosphereRating}</label>
					<RangeSlider
						value={atmosphereRating}
						onChange={onChange}
						min={1}
						max={10}
						defaultValue={1}
						name={'atmosphereRating'}
					/>
				</div>
				<div className={cls.formGroup}>
					<label className={cls.formLabel}>Текста: {textRating}</label>
					<RangeSlider
						value={textRating}
						onChange={onChange}
						min={1}
						max={10}
						defaultValue={1}
						name={'textRating'}
					/>
				</div>
				<div className={cls.formGroup}>
					<label className={cls.formLabel}>Биты: {bitsRating}</label>
					<RangeSlider
						value={bitsRating}
						onChange={onChange}
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
						onChange={onChange}
						min={1}
						max={10}
						defaultValue={1}
						name={'tracksRating'}
					/>
				</div>
				<button type="submit" className={cls.formSubmit}>Добавить альбом</button>
			</form>
		</DynamicModuleLoader>
	);
};
