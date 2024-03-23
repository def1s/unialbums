import cls from './AlbumCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';

/**
 * Определение свойств для компонента AlbumCard
 * @interface AlbumCardProps
 * @property {number} id - Идентификатор альбома
 * @property {string} cover - URL обложки альбома
 * @property {string} title - Название альбома
 * @property {string} artist - Имя исполнителя
 * @property {number} rating - Рейтинг альбома
 * @property {string} className - Дополнительные классы CSS для компонента
 */
export interface AlbumCardProps {
	id: number,
	cover: string,
	title: string,
	artist: string,
	rating: number,
    className?: string
}

/**
 * Компонент AlbumCard для отображения информации об альбоме
 * @param {AlbumCardProps} props - Свойства компонента AlbumCard
 * @returns {React.ReactNode} - Возвращаемый React компонент
 */
export const AlbumCard: FC<AlbumCardProps> = (props: AlbumCardProps): React.ReactNode => {
	const {
		id,
		cover,
		title,
		artist,
		rating,
		className
	} = props;

	return (
		// Компонент Link используется для создания ссылки на страницу альбома
		<Link to={`${id}`} className={classNames(cls.AlbumCard, {}, [className])} key={id}>
			<div className={cls.cover}>
				<img src={cover} alt="Обложка альбома"/>
			</div>
			<div className={cls.title}>{textLengthValidation(title)}</div>
			<div className={cls.artist}>{textLengthValidation(artist)}</div>
			<div className={cls.divider}></div>
			<div className={cls.rating}>{rating}</div>
		</Link>
	);
};
