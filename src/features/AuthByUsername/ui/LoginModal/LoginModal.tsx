import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
    className?: string
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void; // если успешно - закроет модалку и обновит данные пользователя по полученному токену
}

export const LoginModal = memo((props: LoginModalProps) => {
	const {
		className,
		isOpen,
		onClose,
		onSuccess
	} = props;

	return (
		<Modal
			className={classNames(cls.LoginModal, {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<LoginForm
				onSuccess={onSuccess}
			/>
		</Modal>
	);
});
