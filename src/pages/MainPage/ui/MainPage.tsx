import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import collage from '/src/shared/assets/collages/collage.jpeg';

interface MainPageProps {
    className?: string
}

export const MainPage: FC<MainPageProps> = (props) => {
	const {
		className
	} = props;

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<div className={cls.wrapper}>
				<div className={cls.element}>
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
					<div className={cls.description}>lorem lorem lorem lorem lorem lorem lorem</div>
				</div>
			</div>
		</div>
	);
};
