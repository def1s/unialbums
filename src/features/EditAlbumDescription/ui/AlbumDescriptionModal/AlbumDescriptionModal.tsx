import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { AlbumDescriptionForm } from '../../ui/AlbumDescriptionForm/AlbumDescriptionForm';
import cls from './AlbumDescriptionModal.module.scss';

interface AlbumDescriptionModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const AlbumDescriptionModal = memo((props: AlbumDescriptionModalProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props;

	return (
		<Modal
			className={classNames(cls.AlbumDescriptionModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<AlbumDescriptionForm/>
		</Modal>
	);
});
