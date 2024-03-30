import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { useState } from 'react';
import { SearchAlbumsByName } from 'features/SearchAlbumsByName';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Button } from 'shared/ui/Button/Button';

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
	const [isLoginModal, setIsLoginModal] = useState(false);
	const user = useSelector(getUserAuthData);

	const onOpenLoginModal = () => {
		setIsLoginModal(true);
	};

	const onCloseLoginModal = () => {
		setIsLoginModal(false);
	};

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			{
				!user ?
					<Button className={cls.button} onClick={onOpenLoginModal}>Sign in</Button>
					: <div>{`Привет, ${user.login}`}</div>
			}

			<LoginModal
				isOpen={isLoginModal}
				onClose={onCloseLoginModal}
			/>

			<SearchAlbumsByName/>
		</header>
	);
};
