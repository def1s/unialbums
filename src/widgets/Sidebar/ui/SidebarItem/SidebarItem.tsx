import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItemsType } from '../../model/items';
import cls from '../Sidebar/Sidebar.module.scss';

interface SidebarItemProps {
	item: SidebarItemsType;
	onClick?: () => void;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const {
		item,
		onClick
	} = props;

	return (
		<NavLink
			className={cls.link}
			to={item.path}
			onClick={onClick}
		>
			<item.Icon className={cls.icon}/>
			<span className={cls.linkText}>{item.text}</span>
		</NavLink>
	);
});
