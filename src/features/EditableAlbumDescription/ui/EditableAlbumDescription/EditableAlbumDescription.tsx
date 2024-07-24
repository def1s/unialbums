import cls from './EditableAlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumDescription } from 'entities/Albums';
import { useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	fetchAlbumDescription
} from '../../model/services/fetchAlbumDescription/fetchAlbumDescription';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { albumDescriptionActions, albumDescriptionReducer } from '../../model/slice/albumDescriptionSlice';
import {
	getAlbumDescriptionIsLoading
} from '../../model/selectors/getAlbumDescriptionIsLoading/getAlbumDescriptionIsLoading';
import { EditDescription } from 'features/EditableAlbumDescription/ui/EditDescription/EditDescription';
import {
	getAlbumDescriptionReadonly
} from '../../model/selectors/getAlbumDescriptionReadonly/getAlbumDescriptionReadonly';
import {
	getAlbumDescriptionForm
} from '../../model/selectors/getAlbumDescriptionForm/getAlbumDescriptionForm';
import {
	getAlbumDescriptionServerMessage
} from '../../model/selectors/getAlbumDescriptionServerMessage/getAlbumDescriptionServerMessage';
import { Notification, NotificationTheme } from 'shared/ui/Notification/Notification';
import {
	getAlbumDescriptionError
} from '../../model/selectors/getAlbumDescriptionError/getAlbumDescriptionError';
import { useImage } from 'shared/lib/hooks/useImage/useImage';
import {
	getAlbumDescriptionIsEditable
} from '../../model/selectors/getAlbumDescriptionIsEditable/getAlbumDescriptionIsEditable';

/**
 * Свойства для компонента EditableAlbumDescription.
 */
interface EditableAlbumDescriptionProps {
    className?: string
}

/**
 * Начальные редюсеры для DynamicModuleLoader.
 * @type {ReducerList}
 */
const initialReducers: ReducerList = {
	albumDescription: albumDescriptionReducer
};

/**
 * Компонент EditableAlbumDescription для редактирования описания альбома.
 *
 * @param {EditableAlbumDescriptionProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент EditableAlbumDescription.
 */
export const EditableAlbumDescription = ({ className }: EditableAlbumDescriptionProps) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const data = useSelector(getAlbumDescriptionForm);
	const isLoading = useSelector(getAlbumDescriptionIsLoading);
	const error = useSelector(getAlbumDescriptionError);
	const readonly = useSelector(getAlbumDescriptionReadonly);
	const serverMessage = useSelector(getAlbumDescriptionServerMessage);
	const isEditable = useSelector(getAlbumDescriptionIsEditable);

	// Использую кастомный хук для работы с обложкой
	const { onCreateImage, onDeleteImage, localUrlImage } = useImage();

	useEffect(() => {
		dispatch(fetchAlbumDescription({ id }));
		return () => {
			onDeleteImage();
		};
		// eslint-disable-next-line
	}, [dispatch, id]);

	/**
	 * Обработчик изменения названия альбома.
	 *
	 * @param {string} value - Новое значение названия альбома.
	 */
	const onChangeTitle = useCallback((value: string) => {
		dispatch(albumDescriptionActions.updateAlbumDescription({ title: value }));
	}, [dispatch]);

	/**
	 * Обработчик изменения имени исполнителя.
	 *
	 * @param {string} value - Новое значение имени исполнителя.
	 */
	const onChangeArtist = useCallback((value: string) => {
		dispatch(albumDescriptionActions.updateAlbumDescription({ artist: value }));
	}, [dispatch]);

	/**
	 * Обработчик изменения обложки альбома.
	 *
	 * @param {string} value - Новый URL обложки альбома.
	 */
	const onChangeCover = useCallback((value: string) => {
		dispatch(albumDescriptionActions.updateAlbumDescription({ cover: value }));
	}, [dispatch]);

	/**
	 * Обработчик добавления новой обложки альбома.
	 *
	 * @param {ChangeEvent<HTMLInputElement>} e - Событие изменения input файла.
	 */
	const onAddCover = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onCreateImage(e);
		onChangeCover(localUrlImage.current);
	}, [localUrlImage, onChangeCover, onCreateImage]);

	/**
	 * Обработчик удаления обложки альбома.
	 */
	const onDeleteCover = useCallback(() => {
		onDeleteImage();
		onChangeCover('');
	}, [onChangeCover, onDeleteImage]);

	/**
	 * Уведомления.
	 */
	const notifications = (
		<>
			{
				!isLoading && !error && serverMessage &&
                <Notification message={serverMessage} theme={NotificationTheme.SUCCESSFUL}/>
			}

			{
				!isLoading && error &&
                <Notification message={error} theme={NotificationTheme.ERROR}/>
			}
		</>
	);

	return (
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
			<div className={classNames(cls.EditableAlbumDescription, {}, [className])}>
				{/* Уведомления */}
				{notifications}

				<AlbumDescription
					data={data}
					isLoading={isLoading}
					EditFeature={isEditable ? <EditDescription/> : null}
					readonly={readonly}
					onChangeArtist={onChangeArtist}
					onChangeTitle={onChangeTitle}
					onAddCover={onAddCover}
					onDeleteCover={onDeleteCover}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
