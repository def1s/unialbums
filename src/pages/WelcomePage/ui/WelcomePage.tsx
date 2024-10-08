import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import collage from '/src/shared/assets/collages/collage.jpeg';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WelcomePage.module.scss';
// import { RoutesPaths } from 'shared/config/routerConfig/routerConfig';

interface WelcomePageProps {
    className?: string
}

const WelcomePage: FC<WelcomePageProps> = (props) => {
	const {
		className
	} = props;

	// перенаправляем пользователя после логина с welcome страницы
	const user = useSelector(getUserAuthData);
	if (user) {
		// при использовании RoutesPaths ломается сторибук
		// return <Navigate to={RoutesPaths.home}/>;
		return <Navigate to={'/home'}/>;
	}

	return (
		<div className={classNames(cls.WelcomePage, {}, [className])}>
			<div className={cls.wrapper}>
				<div className={classNames(cls.element, {}, [cls.gradient])}>
					<div className={cls.title}>UniAlbums</div>
				</div>

				<div className={cls.element}>
					<div className={cls.description}>Лучшее место для хранения ваших воспоминаний</div>
				</div>
			</div>

			<div className={cls.wrapper}>
				<div className={cls.movingImageContainer}>
					<div className={cls.movingImage}>
						<img src={collage} alt=""/>
						<img src={collage} alt=""/>
					</div>
				</div>

				<div className={cls.element}>
					<div className={cls.description}>Lorem ipsum!</div>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
