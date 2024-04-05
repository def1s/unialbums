import cls from './AlbumForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumFormState } from '../../model/selectors/getAlbumFormState.ts/getAlbumFormState';
import { Input } from 'shared/ui/Input/Input';
import { FormEvent } from 'react';
import { albumFormActions } from '../../model/slice/albumFormSlice';
import { AlbumFormFields } from '../../model/types/albumFormSchema';

interface AlbumFormProps {
    className?: string
}

export const AlbumForm = ({ className }: AlbumFormProps) => {
	const dispatch = useDispatch();

	const {
		artist,
		cover,
		textRating,
		atmosphereRating,
		tracksRating,
		bitsRating,
		title
	} = useSelector(getAlbumFormState);

	const onChange = (value: number | string, field: AlbumFormFields) => {
		dispatch(albumFormActions.setFieldValue({ value: value, field: field }));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			className={classNames(cls.AlbumForm, {}, [className])}
			onSubmit={(e) => onSubmit(e)}
		>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="title">Название альбома:</label>
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
				<label className={cls.formLabel} htmlFor="artist">Исполнитель:</label>
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
				<label className={cls.formLabel} htmlFor="cover">Обложка (URL):</label>
				<Input
					type="text"
					name="cover"
					className={cls.formInput}
					onChange={onChange}
					value={cover}
					required
				/>
			</div>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="cover">Атмосфера: {atmosphereRating}</label>
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
				<label className={cls.formLabel} htmlFor="cover">Текста: {textRating}</label>
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
				<label className={cls.formLabel} htmlFor="cover">Биты: {bitsRating}</label>
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
				<label className={cls.formLabel} htmlFor="cover">Треки: {tracksRating}</label>
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
	);
};
