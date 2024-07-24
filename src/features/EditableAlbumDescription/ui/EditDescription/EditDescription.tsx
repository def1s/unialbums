import cls from './EditDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import {
	getAlbumDescriptionReadonly
} from '../../model/selectors/getAlbumDescriptionReadonly/getAlbumDescriptionReadonly';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { albumDescriptionActions } from '../../model/slice/albumDescriptionSlice';
import {
	updateAlbumDescription
} from 'features/EditableAlbumDescription/model/services/updateAlbumDescription/updateAlbumDescription';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { deleteAlbum } from 'features/EditableAlbumDescription/model/services/deleteAlbum/deleteAlbum';

interface EditDescriptionProps {
    className?: string;
}

export const EditDescription = ({ className }: EditDescriptionProps) => {
	const { id } = useParams();
	const readonly = useSelector(getAlbumDescriptionReadonly);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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

	const onDelete = async () => {
		const result = await dispatch(deleteAlbum({ id }));

		if (result.meta.requestStatus === 'fulfilled') {
			navigate('/home');
		}
	};

	if (!readonly) {
		return (
			<div className={classNames(cls.EditDescription, {}, [className])}>
				<div className={cls.buttonsWrapper}>
					<Button
						className={cls.button}
						onClick={onSave}
					>
						Сохранить
					</Button>

					<Button
						className={cls.button}
						onClick={onReset}
					>
						Сбросить изменения
					</Button>

					<Button
						className={cls.deleteButton}
						onClick={onDelete}
						theme={ThemeButton.RED}
					>
						Удалить альбом
					</Button>
				</div>
			</div>
		);
	} else {
		return (
			<div className={classNames(cls.EditDescription, {}, [className])}>
				<div className={cls.buttonsWrapper}>
					<Button
						className={cls.button}
						onClick={onEdit}
					>
						Редактировать
					</Button>
				</div>
			</div>
		);
	}
};
