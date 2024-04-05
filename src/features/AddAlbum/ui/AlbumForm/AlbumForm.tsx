import cls from './AlbumForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getAddAlbumState } from '../../model/selectors/getAddAlbumState/getAddAlbumState';
import { addAlbumActions } from 'features/AddAlbum';
import { Input } from 'shared/ui/Input/Input';

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
	} = useSelector(getAddAlbumState);

	const onChange = (value: number) => {
		dispatch(addAlbumActions.setAtmosphereRating(value));
	};

	return (
		<form className={classNames(cls.AlbumForm, {}, [className])}>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="title">Title:</label>
				<Input type="text" id="title" name="title" className={cls.formInput} required/>
			</div>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="artist">Artist:</label>
				<Input type="text" id="artist" name="artist" className={cls.formInput} required/>
			</div>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="cover">Cover URL:</label>
				<Input type="text" id="cover" name="cover" className={cls.formInput} required/>
			</div>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="cover">Atmosphere rating: {atmosphereRating}</label>
				<RangeSlider
					value={atmosphereRating}
					onChange={onChange}
					min={1}
					max={10}
					defaultValue={0}
				/>
			</div>
			<div className={cls.formGroup}>
				<label className={cls.formLabel} htmlFor="cover">Cover URL:</label>
				<Input type="text" id="cover" name="cover" className={cls.formInput} required/>
			</div>
			<button type="submit" className={cls.formSubmit}>Add Album</button>
		</form>
	);
};
