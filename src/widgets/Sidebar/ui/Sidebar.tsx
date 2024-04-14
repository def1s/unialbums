import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import { RoutesPaths } from 'shared/config/routerConfig/routerConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import AddAlbumIcon from 'shared/assets/icons/addAlbum.svg';

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {

	return (
		<div className={classNames(cls.Sidebar, {}, [className])}>
			<div className={cls.linksWrapper}>
				<NavLink
					className={cls.link}
					to={RoutesPaths.home}
				>
					<HomeIcon className={cls.icon}/>
					<span className={cls.linkText}>Home</span>
				</NavLink>
				<NavLink
					className={cls.link}
					to={RoutesPaths.addAlbum}
				>
					<AddAlbumIcon className={cls.icon}/>
					<span className={cls.linkText}>Add album</span>
				</NavLink>
			</div>
		</div>
	);
};
