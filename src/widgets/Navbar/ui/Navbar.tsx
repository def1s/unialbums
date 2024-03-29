import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { SearchAlbumsByName } from 'features/SearchAlbumsByName';
import { Modal } from 'shared/ui/Modal/Modal';

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
	const [isLoginModal, setIsLoginModal] = useState(false);

	const onOpenLoginModal = () => {
		setIsLoginModal(true);
	};

	const onCloseLoginModal = () => {
		setIsLoginModal(false);
	};

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<nav className={cls.linksWrapper}>
				<ul className={cls.linksList}>
					<li className={cls.link}>
						<NavLink to={'/'}>UNIALBUMS</NavLink>
						<NavLink to={'/albums'}>My albums</NavLink>
					</li>
				</ul>
			</nav>

			<button onClick={onOpenLoginModal}>Sign in</button>

			<Modal
				isOpen={isLoginModal}
				onClose={onCloseLoginModal}
			>
					Content
			</Modal>

			<SearchAlbumsByName/>
		</header>
	);
};
