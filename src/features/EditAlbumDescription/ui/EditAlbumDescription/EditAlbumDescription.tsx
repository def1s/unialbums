import cls from './EditAlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { AlbumDescriptionModal } from 'features/EditAlbumDescription/ui/AlbumDescriptionModal/AlbumDescriptionModal';

interface EditAlbumDescriptionProps {
    className?: string;
}

export const EditAlbumDescription = ({ className }: EditAlbumDescriptionProps) => {
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
};
