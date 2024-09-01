import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { AlbumDescriptionModal } from '../AlbumDescriptionModal/AlbumDescriptionModal';
import cls from './EditAlbumDescription.module.scss';

interface EditAlbumDescriptionProps {
    className?: string;
}

export const EditAlbumDescription = memo(({ className }: EditAlbumDescriptionProps) => {
	const [isEditAlbumDescriptionModal, setIsEditAlbumDescriptionModal] = useState(false);

	const onOpenEditModal = useCallback(() => {
		setIsEditAlbumDescriptionModal(true);
	}, []);

	const onCloseEditModal = useCallback(() => {
		setIsEditAlbumDescriptionModal(false);
	}, []);

	return (
		<div className={classNames(cls.EditAlbumDescription, {}, [className])}>
			<div className={cls.buttonsWrapper}>
				<Button
					className={cls.button}
					onClick={onOpenEditModal}
				>
					Редактировать
				</Button>
			</div>

			{
				isEditAlbumDescriptionModal &&
				<AlbumDescriptionModal
					isOpen={isEditAlbumDescriptionModal}
					onClose={onCloseEditModal}
				/>
			}
		</div>
	);
});
