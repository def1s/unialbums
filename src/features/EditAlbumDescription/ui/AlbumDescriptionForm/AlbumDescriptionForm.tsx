import cls from './AlbumDescriptionForm.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { InputFile } from 'shared/ui/InputFile/InputFile';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useImage } from 'shared/lib/hooks/useImage/useImage';
import { getAlbumDescriptionData } from 'entities/Albums/AlbumDescription';
import { useSelector } from 'react-redux';
import { getAlbumDescriptionFormData } from 'features/EditAlbumDescription/model/selectors/selectors';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { albumDescriptionFormActions, albumDescriptionFormReducer } from '../../model/slice/albumDescriptionFormSlice';
import { Button } from 'shared/ui/Button/Button';

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

	const albumData = useSelector(getAlbumDescriptionData);
	const formData = useSelector(getAlbumDescriptionFormData);

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

	// const onSubmit = (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	dispatch(addAlbumToUser());
	// };

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.AlbumDescriptionForm, {}, [className])}>
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
			</div>
		</DynamicModuleLoader>
	);
};
