import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { deleteUserAlbum } from '../model/services/deleteUserAlbum';
import cls from './DeleteAlbum.module.scss';

interface DeleteAlbumProps {
    className?: string;
	albumId: string;
}

export const DeleteAlbum = (props: DeleteAlbumProps) => {
	const {
		className,
		albumId
	} = props;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onDelete = useCallback(async () => {
		const result = await dispatch(deleteUserAlbum(albumId));

		if (result.meta.requestStatus === 'fulfilled') {
			navigate('/home');
		}
	}, [dispatch, albumId]);

	return (
		<Button
			className={classNames(cls.DeleteAlbum, {}, [className])}
			onClick={onDelete}
		>
			Удалить альбом
		</Button>
	);
};
