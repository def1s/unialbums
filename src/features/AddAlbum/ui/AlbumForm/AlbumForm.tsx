import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchList } from 'entities/SearchAlbums';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useImage } from 'shared/lib/hooks/useImage/useImage';
import { Blur } from 'shared/ui/Blur/Blur';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { InputFile } from 'shared/ui/InputFile/InputFile';
import { Loader } from 'shared/ui/Loader/Loader';
import { RangeSlider } from 'shared/ui/RangeSlider/RangeSlider';
import { getAlbumFormData } from '../../model/selectors/getAlbumFormData/getAlbumFormData';
import { getAlbumFormError } from '../../model/selectors/getAlbumFormError/getAlbumFormError';
import { getAlbumFormIsLoading } from '../../model/selectors/getAlbumFormIsLoading/getAlbumFormIsLoading';
import { getSearchAlbums } from '../../model/selectors/getSearchAlbums/getSearchAlbums';
import { getSearchIsLoading } from '../../model/selectors/getSearchIsLoading/getSearchIsLoading';
import { addAlbumToUser } from '../../model/services/addAlbumToUser/addAlbumToUser';
import { fetchAlbumSpotify } from '../../model/services/fetchAlbumSpotify/fetchAlbumSpotify';
import { searchAlbumsSpotify } from '../../model/services/searchAlbumsSpotify/searchAlbumsSpotify';
import { albumFormActions, albumFormReducer } from '../../model/slice/albumFormSlice';
import cls from './AlbumForm.module.scss';

interface AlbumFormProps {
    className?: string
}

const initialReducers: ReducerList = {
	albumForm: albumFormReducer
};

/**
 * Форма для добавления альбома от пользователя. Собирает данные и изображение, после чего отправляет их на сервер.
 * Не имеет валидации.
 * Во время ввода информации об альбоме показывает пользователю варианты из spotify api
 */
export const AlbumForm = memo(({ className }: AlbumFormProps) => {
	const dispatch = useAppDispatch();

	const formData = useSelector(getAlbumFormData);
	const isLoading = useSelector(getAlbumFormIsLoading);
	const error = useSelector(getAlbumFormError);
	const searchAlbums = useSelector(getSearchAlbums);
	const isSearching = useSelector(getSearchIsLoading);

	const { localUrlImage, onCreateImage, onDeleteImage } = useImage();
	const [isInputFocused, setIsInputFocused] = useState(false);
	/**
	 * для отмены запросов, когда не успел прийти предыдущий при поиске альбомов
	 */
	const searchAbortControllerRef = useRef<AbortController | null>(null);

	// очищение URL после размонтирования компонента
	useEffect(() => {
		return () => {
			onDeleteImage();
		};
		//eslint-disable-next-line
	}, []);

	/**
	 * обработчики инпутов
	 * каждый обработчик изменяет свое поле
	 */
	const onChangeCover = useCallback((cover: string) => {
		dispatch(albumFormActions.setFieldValue({ cover: cover }));
	}, [dispatch]);

	const onChangeTitle = useCallback((title: string) => {
		if (searchAbortControllerRef.current) {
			searchAbortControllerRef.current.abort();
		}
		searchAbortControllerRef.current = new AbortController();

		dispatch(albumFormActions.setFieldValue({ title: title }));
		// поиск альбомов через спотифай
		dispatch(searchAlbumsSpotify(searchAbortControllerRef.current));
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

	/**
	 * Для работы с изображениями использую кастомный хук.
	 * Хук предоставляет возможность создать локальную ссылку на изображение,
	 * чтобы ее можно было поместить в слайс.
	 * Также ссылку можно удалить, вместе с этим стерев изображение.
	 */
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

	const onClickAlbumFromSearch = useCallback((albumId: string) => {
		dispatch(fetchAlbumSpotify({ albumId }));
	}, [dispatch]);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<form
				className={classNames(cls.AlbumForm, {}, [className])}
				onSubmit={(e) => onSubmit(e)}
				encType={'multipart/form-data'}
			>

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
							onFocus={() => setIsInputFocused(true)}
							onBlur={() => setIsInputFocused(false)}
							style={isInputFocused ? { 'marginBottom': '0' } : undefined}
							label={'Название альбома'}
							required
						/>

						<div className={cls.suggestions}>
							{isInputFocused && <SearchList items={searchAlbums} isLoading={isSearching} onClickItem={onClickAlbumFromSearch}/>}
						</div>

						<Input
							type="text"
							name="artist"
							className={cls.formInput}
							onChange={onChangeArtist}
							value={formData?.artist}
							label={'Исполнитель'}
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
