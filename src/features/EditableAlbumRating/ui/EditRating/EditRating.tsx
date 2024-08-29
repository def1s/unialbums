import cls from './EditRating.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	updateAlbumDescription
} from 'features/EditableAlbumDescription/model/services/updateAlbumDescription/updateAlbumDescription';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { albumRatingActions } from '../../model/slice/albumRatingSlice';
import { useSelector } from 'react-redux';
import {
	getAlbumRatingReadonly
} from '../../model/selectors/getAlbumRatingReadonly/getAlbumRatingReadonly';
import { updateAlbumRating } from 'features/EditableAlbumRating/model/services/updateAlbumRating/updateAlbumRating';

interface EditRatingProps {
	className?: string;
}

export const EditRating = ({ className }: EditRatingProps) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const readonly = useSelector(getAlbumRatingReadonly);

	const onEdit = useCallback(() => {
		dispatch(albumRatingActions.setReadonly(false));
	}, [dispatch]);

	const onSave = useCallback(async () => {
		const result = await dispatch(updateAlbumRating({ id }));

		if (result.meta.requestStatus === 'fulfilled') {
			dispatch(albumRatingActions.setReadonly(true));
		}
	}, [dispatch, id]);

	const onReset = () => {
		dispatch(albumRatingActions.resetRatingSliders());
		dispatch(albumRatingActions.setReadonly(true));
	};

	if (!readonly) {
		return (
			<div className={classNames(cls.EditRating, {}, [className])}>
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
						Сбросить
					</Button>
				</div>
			</div>
		);
	} else {
		return (
			<div className={classNames(cls.EditRating, {}, [className])}>
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
