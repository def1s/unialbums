import cls from '../Sidebar/Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { SidebarItemsType } from '../../model/items';
import { memo } from 'react';

interface SidebarItemProps {
	item: SidebarItemsType;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => {

	return (
		<NavLink
			className={cls.link}
			to={item.path}
		>
			<item.Icon className={cls.icon}/>
			<span className={cls.linkText}>{item.text}</span>
		</NavLink>
	);
});
