import cls from './AlbumDescriptionModal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { AlbumDescriptionForm } from 'features/EditAlbumDescription/ui/AlbumDescriptionForm/AlbumDescriptionForm';

interface AlbumDescriptionModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const AlbumDescriptionModal = (props: AlbumDescriptionModalProps) => {
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
};
