import React, { ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { albumDescriptionActions, getAlbumDescriptionData } from 'entities/Albums/AlbumDescription';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useImage } from 'shared/lib/hooks/useImage/useImage';
import { Blur } from 'shared/ui/Blur/Blur';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { InputFile } from 'shared/ui/InputFile/InputFile';
import { Loader } from 'shared/ui/Loader/Loader';
import {
	getAlbumDescriptionFormData,
	getAlbumDescriptionFormError,
	getAlbumDescriptionFormIsLoading, getAlbumDescriptionFormServerMessage
} from '../../model/selectors/selectors';
import { updateAlbumDescription } from '../../model/services/updateAlbumDescription/updateAlbumDescription';
import { albumDescriptionFormActions, albumDescriptionFormReducer } from '../../model/slice/albumDescriptionFormSlice';
import cls from './AlbumDescriptionForm.module.scss';

interface AlbumDescriptionFormProps {
	className?: string;
}

const initialReducers: ReducerList = {
	albumDescriptionForm: albumDescriptionFormReducer
};

export const AlbumDescriptionForm = (props: AlbumDescriptionFormProps) => {
	const {
		className
	} = props;

	const dispatch = useAppDispatch();
	const { localUrlImage, onCreateImage, onDeleteImage } = useImage();

	const { id } = useParams();
	const albumData = useSelector(getAlbumDescriptionData);
	const formData = useSelector(getAlbumDescriptionFormData);
	const isLoading = useSelector(getAlbumDescriptionFormIsLoading);
	const error = useSelector(getAlbumDescriptionFormError);
	const serverMessage = useSelector(getAlbumDescriptionFormServerMessage);

	useEffect(() => {
		if (albumData) {
			dispatch(albumDescriptionFormActions.initAlbumDescriptionForm(albumData));
		}
	}, [albumData, dispatch]);

	const onChangeCover = useCallback((cover: string) => {
		dispatch(albumDescriptionFormActions.updateAlbumDescriptionForm({ cover: cover }));
	}, [dispatch]);

	const onChangeTitle = useCallback((title: string) => {
		dispatch(albumDescriptionFormActions.updateAlbumDescriptionForm({ title: title }));
	}, [dispatch]);

	const onChangeArtist = useCallback((artist: string) => {
		dispatch(albumDescriptionFormActions.updateAlbumDescriptionForm({ artist: artist }));
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

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await dispatch(updateAlbumDescription({ id }));

		if (result.meta.requestStatus === 'fulfilled') {
			dispatch(albumDescriptionActions.updateAlbumDescription(formData || {}));
		}
	};

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<form
				className={classNames(cls.AlbumDescriptionForm, {}, [className])}
				onSubmit={onSubmit}
			>
				{
					isLoading && !error && (
						<>
							<Loader/>
							<Blur className={cls.blurBorder}/>
						</>
					)
				}

				<InputFile
					onChange={onCoverAdd}
					selectedFile={formData?.cover}
					onRemove={onCoverDelete}
					className={cls.cover}
					label='Обложка'
				/>

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

				<Button className={cls.submitBtn}>Сохранить изменения</Button>
			</form>
		</DynamicModuleLoader>
	);
};
