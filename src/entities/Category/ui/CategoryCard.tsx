import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { IAlbum } from 'shared/types';
import cls from './CategoryCard.module.scss';

interface CategoryCardProps {
	image: string,
	url: string,
	title: string,
}

/**
 * Компонент CategoryCard для отображения информации об альбоме
 * @param {AlbumCardProps} props - Свойства компонента CategoryCard
 * @returns {React.ReactNode} - Возвращаемый React компонент
 */
export const CategoryCard: FC<CategoryCardProps> = memo((props: CategoryCardProps): React.ReactNode => {
	const {
		image,
		url,
		title,
	} = props;


	return (
		// Компонент Link используется для создания ссылки на страницу альбома
		<Link to={`/category/${url}`} className={classNames(cls.AlbumCard)}>
			<div className={cls.cover}>
				<img src={image} alt="Обложка альбома"/>
			</div>
			<div className={cls.title}>{textLengthValidation(title || '')}</div>
			<div className={cls.divider}></div>
		</Link>
	);
});
