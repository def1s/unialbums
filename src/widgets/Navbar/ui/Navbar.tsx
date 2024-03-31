import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { useState } from 'react';
import { SearchAlbumsByName } from 'features/SearchAlbumsByName';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Button } from 'shared/ui/Button/Button';

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
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

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			{/* контент, отображающийся только если пользователь в системе */}
			{
				!user ?
					<Button className={cls.button} onClick={onOpenLoginModal}>Войти</Button>
					:
					<>
						<div>
							Привет, {user.username}
							<Button className={cls.button} onClick={onLogout}>Выйти</Button>
						</div>
						<SearchAlbumsByName/>
					</>

			}

			<LoginModal
				isOpen={isLoginModal}
				onClose={onCloseLoginModal}
			/>
		</header>
	);
};
