import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import React from 'react';

interface MainPageProps {
    className?: string
}

export const MainPage: FC<MainPageProps> = (props) => {
	const {
		className
	} = props;

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<div className={cls.promo}>
				<h1>UniAlbums</h1>
			</div>

			<div className={cls.description}>Лучшее место для хранения ваших воспоминаний</div>

			<button className={cls.signInButton}>Войти</button>

			<div className={cls.wrapper}>
				<div className={cls.infoCard}>
					<img src="" alt="Коллаж из альбомов"/>
					<div className={cls.info}>
						lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.
						lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.
					</div>
				</div>
				<div className={cls.infoCard}>
					<div>Soon...</div>
				</div>
			</div>
		</div>
	);
};
