import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { AlbumRatingModal } from '../AlbumRatingModal/AlbumRatingModal';
import cls from './EditAlbumRating.module.scss';

interface EditAlbumRatingProps {
    className?: string;
}

export const EditAlbumRating = memo((props: EditAlbumRatingProps) => {
	const {
		className
	} = props;

	const [isEditAlbumRatingModal, setIsEditAlbumRatingModal] = useState(false);

	const onOpenEditModal = useCallback(() => {
		setIsEditAlbumRatingModal(true);
	}, []);

	const onCloseEditModal = useCallback(() => {
		setIsEditAlbumRatingModal(false);
	}, []);

	return (
		<div className={classNames(cls.EditAlbumRating, {}, [className])}>
			<Button
				onClick={onOpenEditModal}
				className={cls.editBtn}
			>
				Изменить
			</Button>

			{
				isEditAlbumRatingModal &&
                <AlbumRatingModal
                	isOpen={isEditAlbumRatingModal}
                	onClose={onCloseEditModal}
                />
			}
		</div>
	);
});
