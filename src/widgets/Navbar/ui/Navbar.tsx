import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useState } from 'react';
import { SearchAlbumsByName } from 'features/SearchAlbumsByName';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Button } from 'shared/ui/Button/Button';
import DefaultAvatar from 'shared/assets/icons/default-avatar.svg';
import { Link } from 'react-router-dom';

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const [isLoginModal, setIsLoginModal] = useState(false);
	const user = useSelector(getUserAuthData);
	const dispatch = useDispatch();

	const onOpenLoginModal = () => {
		setIsLoginModal(true);
	};

	const onCloseLoginModal = () => {
		setIsLoginModal(false);
	};

	const onLogout = () => {
		dispatch(userActions.logout());
	};

	if (!user) {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<Button className={cls.button} onClick={onOpenLoginModal}>Войти</Button>
				{
					isLoginModal &&
						<LoginModal
							isOpen={isLoginModal}
							onClose={onCloseLoginModal}
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
