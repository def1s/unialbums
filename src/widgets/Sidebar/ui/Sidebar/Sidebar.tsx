import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { sidebarItemsList } from 'widgets/Sidebar/model/items';
import { SidebarItem } from 'widgets/Sidebar/ui/SidebarItem/SidebarItem';
import { memo, useCallback, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const onOpenBurgerMenu = useCallback(() => {
		setIsMenuOpen(true);
	}, []);

	const onCloseBurgerMenu = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const onClickLink = useCallback(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		}
	}, [isMenuOpen]);

	const mods = {
		[cls.open]: isMenuOpen
	};

	return (
		<div className={classNames(cls.Sidebar, mods, [className])}>
			{isMenuOpen && <div className={cls.cross} onClick={onCloseBurgerMenu}></div>}

			<div
				className={cls.arrow}
				onClick={onOpenBurgerMenu}
			></div>

			<div className={cls.linksWrapper}>
				{
					sidebarItemsList.map(item => (
						<SidebarItem
							item={item}
							key={item.path}
							onClick={onClickLink}
						/>
					))
				}
			</div>
		</div>
	);
});
