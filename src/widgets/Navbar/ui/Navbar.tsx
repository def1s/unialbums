import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useState } from 'react';
import { SearchAlbumsByName } from 'features/SearchAlbumsByName';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData, userInitAuthData } from 'entities/User';
import { Button } from 'shared/ui/Button/Button';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';
import { Link } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { RegistrationModal } from 'features/RegistrationByUsername';
import { userLogout } from 'entities/User/model/services/userLogout/userLogout';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

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
				<SearchAlbumsByName/>
			</header>
		);
	}
});
