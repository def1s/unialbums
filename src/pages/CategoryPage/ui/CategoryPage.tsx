import React from 'react';
import { useParams } from 'react-router-dom';
import { UserAlbums } from 'widgets/UserAlbums';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CategoryPage.module.scss';

interface HomePageProps {
    className?: string
}

const categoriesTitles = {
	'hiphop': 'Хип-хоп',
	'jazz': 'Джаз',
	'rnb': 'RnB',
	'rock': 'Рок',
	'techno': 'Техно',
};

export const CategoryPage = ({ className }: HomePageProps) => {
	const { category } = useParams();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const title = categoriesTitles[category] ?? 'Категория';


	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<div className={cls.wrapper}>
				{title}
			</div>
			<UserAlbums className={cls.userAlbums} category={category} />
		</div>
	);
};

