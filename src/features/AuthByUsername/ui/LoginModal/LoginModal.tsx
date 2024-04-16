import { LoginForm } from '../LoginForm/LoginForm';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { memo } from 'react';

interface LoginModalProps {
    className?: string
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = memo(({ className, isOpen, onClose }: LoginModalProps) => {

	return (
		<Modal
			className={classNames(cls.LoginModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<LoginForm
				onSuccess={onClose}
			/>
		</Modal>
	);
});
