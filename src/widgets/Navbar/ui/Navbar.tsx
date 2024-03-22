import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { SearchAlbumsByName } from 'features/SearchAlbumsByName';

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => {

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

			<SearchAlbumsByName/>
		</header>
	);
};
