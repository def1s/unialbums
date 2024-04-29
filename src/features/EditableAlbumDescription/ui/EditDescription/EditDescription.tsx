import cls from './EditDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditControl } from 'entities/EditControl';
import { useSelector } from 'react-redux';
import {
	getAlbumDescriptionReadonly
} from '../../model/selectors/getAlbumDescriptionReadonly/getAlbumDescriptionReadonly';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { albumDescriptionActions } from '../../model/slice/albumDescriptionSlice';

interface EditDescriptionProps {
    className?: string;
}

export const EditDescription = ({ className }: EditDescriptionProps) => {

	const readonly = useSelector(getAlbumDescriptionReadonly);
	const dispatch = useAppDispatch();

	const onEdit = () => {
		dispatch(albumDescriptionActions.setReadonly(false));
	};

	const onSave = () => {
		//
	};

	const onReset = () => {
		//
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
