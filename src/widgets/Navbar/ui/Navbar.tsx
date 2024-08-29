import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginModal } from 'features/AuthByUsername';
import { RegistrationModal } from 'features/RegistrationByUsername';
import { getUserAuthData, userInitAuthData } from 'entities/User';
import { userLogout } from 'entities/User';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const [isLoginModal, setIsLoginModal] = useState(false);
	const [isRegistrationModal, setIsRegistrationModal] = useState(false);
	const user = useSelector(getUserAuthData);
	const dispatch = useAppDispatch();

	const onOpenLoginModal = () => {
		setIsLoginModal(true);
	};

	const onCloseLoginModal = () => {
		setIsLoginModal(false);
	};

	const onOpenRegistrationModal = () => {
		setIsRegistrationModal(true);
	};

	const onCloseRegistrationModal = () => {
		setIsRegistrationModal(false);
	};

	// при успешном входе будет выполнено закрытие модалки и инициализация пользователя по полученному токену
	const onSuccessAuth = () => {
		onCloseLoginModal();
		dispatch(userInitAuthData());
	};

	const onLogout = () => {
		dispatch(userLogout());
	};

	if (!user) {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.buttonsWrapper}>
					<Button
						className={cls.button}
						onClick={onOpenLoginModal}
					>
						Войти
					</Button>
					<Text
						text={'Нет аккаунта?'}
					/>
					<Button
						className={cls.button}
						onClick={onOpenRegistrationModal}
					>
						Создать
					</Button>
				</div>
				{
					isLoginModal &&
						<LoginModal
							isOpen={isLoginModal}
							onClose={onCloseLoginModal}
							onSuccess={onSuccessAuth}
						/>
				}

				{
					isRegistrationModal &&
						<RegistrationModal
							isOpen={isRegistrationModal}
							onClose={onCloseRegistrationModal}
						/>
				}
			</header>
		);
	} else {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<div className={cls.userInfo}>
					<Link
						to={'/profile'}
					>
						{
							user.avatar ?
								<img
									src={user.avatar}
									alt="user avatar"
									className={cls.avatar}
								/>
								: <DefaultAvatar className={cls.avatar}/>
						}
					</Link>

					<span className={cls.username}>{user.username}</span>
					<Button className={cls.button} onClick={onLogout}>Выйти</Button>
				</div>
				{/*<SearchAlbumsByName/>*/}
			</header>
		);
	}
});
