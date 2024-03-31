import cls from './Sidebar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import { RoutesPaths } from 'shared/config/routerConfig/routerConfig';
import AlbumsIcon from 'shared/assets/icons/albums.svg';

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {

	return (
		<div className={classNames(cls.Sidebar, {}, [className])}>
			<div className={cls.linksWrapper}>
				<NavLink
					className={cls.link}
					to={RoutesPaths.albums}
				>
					<AlbumsIcon className={cls.icon}/>
					<span className={cls.linkText}>My albums</span>
				</NavLink>
			</div>
		</div>
	);
};
