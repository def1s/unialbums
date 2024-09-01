import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import cls from './RegistrationModal.module.scss';

interface RegistrationModalProps {
    className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const RegistrationModal = memo(({ className, isOpen, onClose }: RegistrationModalProps) => {

	return (
		<Modal
			className={classNames(cls.RegistrationModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<RegistrationForm/>
		</Modal>
	);
});
