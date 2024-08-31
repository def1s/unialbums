import React from 'react';
import { PlugCard } from 'widgets/PlugCard';
import { UserAlbums } from 'widgets/UserAlbums';
import { UserCard } from 'widgets/UserCard';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './HomePage.module.scss';

interface HomePageProps {
    className?: string
}

const HomePage = ({ className }: HomePageProps) => {

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<div className={cls.wrapper}>
				<UserCard/>
				<PlugCard title={'Сайт находится в разработке.'} text={'Так что на этом месте только текст и заглушка...'}/>
			</div>
			<UserAlbums className={cls.userAlbums}/>
		</div>
	);
};

export default HomePage;
