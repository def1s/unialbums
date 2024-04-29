import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { sidebarItemsList } from 'widgets/Sidebar/model/items';
import { SidebarItem } from 'widgets/Sidebar/ui/SidebarItem/SidebarItem';
import { memo } from 'react';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {

	return (
		<div className={classNames(cls.Sidebar, {}, [className])}>
			<div className={cls.linksWrapper}>
				{
					sidebarItemsList.map(item => (
						<SidebarItem
							item={item}
							key={item.path}
						/>
					))
				}
			</div>
		</div>
	);
});
