import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { AlbumRatingForm } from '../AlbumRatingForm/AlbumRatingForm';
import cls from './AlbumRatingModal.module.scss';

interface AlbumRatingModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const AlbumRatingModal = memo((props: AlbumRatingModalProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props;

	return (
		<Modal
			className={classNames(cls.AlbumRatingModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<AlbumRatingForm/>
		</Modal>
	);
});
