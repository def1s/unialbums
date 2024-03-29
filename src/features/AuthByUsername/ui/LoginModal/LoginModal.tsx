import cls from './LoginModal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
    className?: string
}

export const LoginModal = ({ className }: LoginModalProps) => {

	return (
		<div className={classNames(cls.LoginModal, {}, [className])}>
			<LoginForm/>
		</div>
	);
};
