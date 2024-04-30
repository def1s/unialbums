import cls from './EditableAlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AlbumDescription } from 'entities/Albums';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
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
	getAlbumDescriptionMessage
} from '../../model/selectors/getAlbumDescriptionMessage/getAlbumDescriptionMessage';
import { Notification, NotificationTheme } from 'shared/ui/Notification/Notification';
import {
	getAlbumDescriptionError
} from '../../model/selectors/getAlbumDescriptionError/getAlbumDescriptionError';

interface EditableAlbumDescriptionProps {
    className?: string
}

const initialReducers: ReducerList = {
	albumDescription: albumDescriptionReducer
};

export const EditableAlbumDescription = ({ className }: EditableAlbumDescriptionProps) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const data = useSelector(getAlbumDescriptionForm);
	const isLoading = useSelector(getAlbumDescriptionIsLoading);
	const error = useSelector(getAlbumDescriptionError);
	const readonly = useSelector(getAlbumDescriptionReadonly);
	const serverMessage = useSelector(getAlbumDescriptionMessage);

	useEffect(() => {
		dispatch(fetchAlbumDescription({ id }));
	}, [dispatch, id]);

	const onChangeTitle = useCallback((value: string) => {
		dispatch(albumDescriptionActions.updateAlbumDescription({ title: value }));
	}, [dispatch]);

	const onChangeArtist = useCallback((value: string) => {
		dispatch(albumDescriptionActions.updateAlbumDescription({ artist: value }));
	}, [dispatch]);

	// уведомления
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
				{/* уведомления */}
				{notifications}

				<AlbumDescription
					data={data}
					isLoading={isLoading}
					EditFeature={<EditDescription/>}
					readonly={readonly}
					onChangeArtist={onChangeArtist}
					onChangeTitle={onChangeTitle}
				/>
			</div>
		</DynamicModuleLoader>
	);
};
