import cls from './AlbumForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { useSelector } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';
import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect } from 'react';
import { albumFormActions, albumFormReducer } from '../../model/slice/albumFormSlice';
import { addAlbumToUser } from '../../model/services/addAlbumToUser/addAlbumToUser';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { InputFile } from 'shared/ui/InputFile/InputFile';
import { Button } from 'shared/ui/Button/Button';
import { getAlbumFormIsLoading } from '../../model/selectors/getAlbumFormIsLoading/getAlbumFormIsLoading';
import { getAlbumFormError } from '../../model/selectors/getAlbumFormError/getAlbumFormError';
import { Loader } from 'shared/ui/Loader/Loader';
import { Blur } from 'shared/ui/Blur/Blur';
import { getAlbumFormMessage } from '../../model/selectors/getAlbumFormMessage/getAlbumFormMessage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAlbumFormData } from '../../model/selectors/getAlbumFormData/getAlbumFormData';
import { Notification, NotificationTheme } from 'shared/ui/Notification/Notification';
import { useImage } from 'shared/lib/hooks/useImage/useImage';

interface AlbumFormProps {
    className?: string
}

const initialReducers: ReducerList = {
	albumForm: albumFormReducer
};

/*
* Форма для добавления альбома от пользователя. Собирает данные и изображение, после чего отправляет их на сервер.
* Не имеет валидации.
* */
export const AlbumForm = memo(({ className }: AlbumFormProps) => {
	const dispatch = useAppDispatch();

	const formData = useSelector(getAlbumFormData);
	const isLoading = useSelector(getAlbumFormIsLoading);
	const error = useSelector(getAlbumFormError);
	const serverMessage = useSelector(getAlbumFormMessage);

	const { localUrlImage, onCreateImage, onDeleteImage } = useImage();

	// очищение URL после размонтирования компонента
	useEffect(() => {
		return () => {
			onDeleteImage();
		};
		//eslint-disable-next-line
	}, []);

	// обработчики инпутов
	// каждый обработчик изменяет свое поле
	const onChangeCover = useCallback((cover: string) => {
		dispatch(albumFormActions.setFieldValue({ cover: cover }));
	}, [dispatch]);

	const onChangeTitle = useCallback((title: string) => {
		dispatch(albumFormActions.setFieldValue({ title: title }));
	}, [dispatch]);

	const onChangeArtist = useCallback((artist: string) => {
		dispatch(albumFormActions.setFieldValue({ artist: artist }));
	}, [dispatch]);

	const onChangeAtmosphereRating = useCallback((atmosphereRating: number | string) => {
		dispatch(albumFormActions.setFieldValue({ atmosphereRating: +atmosphereRating }));
	}, [dispatch]);

	const onChangeTextRating = useCallback((textRating: number | string) => {
		dispatch(albumFormActions.setFieldValue({ textRating: +textRating }));
	}, [dispatch]);

	const onChangeBitsRating = useCallback((bitsRating: number | string) => {
		dispatch(albumFormActions.setFieldValue({ bitsRating: +bitsRating }));
	}, [dispatch]);

	const onChangeTracksRating = useCallback((tracksRating: number | string) => {
		dispatch(albumFormActions.setFieldValue({ tracksRating: +tracksRating }));
	}, [dispatch]);

	/*
	* Для работы с изображениями использую кастомный хук.
	* Хук предоставляет возможность создать локальную ссылку на изображение,
	* чтобы ее можно было поместить в слайс.
	* Также ссылку можно удалить, вместе с этим стерев изображение.
	* */
	const onCoverAdd = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onCreateImage(e);
		onChangeCover(localUrlImage.current);
	}, [localUrlImage, onChangeCover, onCreateImage]);

	const onCoverDelete = useCallback(() => {
		onDeleteImage();
		onChangeCover('');
	}, [onChangeCover, onDeleteImage]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addAlbumToUser());
	};

	// уведомления
	const notifications = (
		<>
			{
				!isLoading && error &&
                <Notification message={error} theme={NotificationTheme.ERROR}/>
			}

			{
				!isLoading && !error && serverMessage &&
                <Notification message={serverMessage} theme={NotificationTheme.SUCCESSFUL}/>
			}
		</>
	);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<form
				className={classNames(cls.AlbumForm, {}, [className])}
				onSubmit={(e) => onSubmit(e)}
			>
				{/* уведомления */}
				{notifications}

				{/* лоадер */}
				{
					isLoading && !error && (
						<>
							<Loader/>
							<Blur/>
						</>
					)
				}

				<div className={cls.info}>
					<InputFile
						onChange={onCoverAdd}
						selectedFile={formData?.cover}
						onRemove={onCoverDelete}
						className={cls.cover}
						label='Обложка'
					/>
					<div className={cls.descriptionWrapper}>
						<Input
							type="text"
							name="title"
							className={cls.formInput}
							onChange={onChangeTitle}
							value={formData?.title}
							placeholder='Название альбома'
							required
						/>

						<Input
							type="text"
							name="artist"
							className={cls.formInput}
							onChange={onChangeArtist}
							value={formData?.artist}
							placeholder='Исполнитель'
							required
						/>
					</div>
				</div>

				<div className={cls.ratingWrapper}>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Атмосфера: {formData?.atmosphereRating}</label>
						<RangeSlider
							className={cls.rangeSlider}
							value={formData?.atmosphereRating || 1}
							onChange={onChangeAtmosphereRating}
							min={1}
							max={10}
							defaultValue={1}
							name={'atmosphereRating'}
						/>
					</div>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Текста: {formData?.textRating}</label>
						<RangeSlider
							className={cls.rangeSlider}
							value={formData?.textRating || 1}
							onChange={onChangeTextRating}
							min={1}
							max={10}
							defaultValue={1}
							name={'textRating'}
						/>
					</div>
				</div>

				<div className={cls.ratingWrapper}>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Биты: {formData?.bitsRating}</label>
						<RangeSlider
							value={formData?.bitsRating || 1}
							onChange={onChangeBitsRating}
							min={1}
							max={10}
							defaultValue={1}
							name={'bitsRating'}
						/>
					</div>
					<div className={cls.formGroup}>
						<label className={cls.formLabel}>Треки: {formData?.tracksRating}</label>
						<RangeSlider
							value={formData?.tracksRating || 1}
							onChange={onChangeTracksRating}
							min={1}
							max={10}
							defaultValue={1}
							name={'tracksRating'}
						/>
					</div>
				</div>

				<Button
					type="submit"
					className={cls.formSubmit}
					disabled={isLoading}
				>
					Добавить альбом
				</Button>
			</form>

		</DynamicModuleLoader>
	);
});
