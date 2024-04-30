import cls from './EditDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditControl } from 'entities/EditControl';
import { useSelector } from 'react-redux';
import {
	getAlbumDescriptionReadonly
} from '../../model/selectors/getAlbumDescriptionReadonly/getAlbumDescriptionReadonly';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { albumDescriptionActions } from '../../model/slice/albumDescriptionSlice';
import {
	updateAlbumDescription
} from 'features/EditableAlbumDescription/model/services/updateAlbumDescription/updateAlbumDescription';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

interface EditDescriptionProps {
    className?: string;
}

export const EditDescription = ({ className }: EditDescriptionProps) => {
	const { id } = useParams();
	const readonly = useSelector(getAlbumDescriptionReadonly);
	const dispatch = useAppDispatch();

	const onEdit = useCallback(() => {
		dispatch(albumDescriptionActions.setReadonly(false));
	}, [dispatch]);

	const onSave = useCallback(async () => {
		const result = await dispatch(updateAlbumDescription({ id }));

		if (result.meta.requestStatus === 'fulfilled') {
			dispatch(albumDescriptionActions.setReadonly(true));
		}
	}, [dispatch, id]);

	const onReset = () => {
		dispatch(albumDescriptionActions.resetForm());
		dispatch(albumDescriptionActions.setReadonly(true));
	};

	return (
		<div className={classNames(cls.EditDescription, {}, [className])}>
			<EditControl
				onEdit={onEdit}
				onSave={onSave}
				onReset={onReset}
				readonly={readonly}
			/>
		</div>
	);
};
