import cls from './AlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';

/**
 * Интерфейс для свойств компонента AlbumDescription.
 *
 * @interface
 * @property {string} cover - URL обложки альбома.
 * @property {string} title - Название альбома.
 * @property {string} artist - Имя исполнителя альбома.
 * @property {number} year - Год выпуска альбома.
 * @property {number} rating - Рейтинг альбома.
 * @property {string} [className] - Дополнительные классы CSS для компонента.
 */
interface AlbumDescriptionProps {
	cover: string,
	title: string,
	artist: string,
	year: number,
	rating: number,
	className?: string
}

/**
 * Компонент для отображения информации об альбоме.
 *
 * @param {AlbumDescriptionProps} props - Свойства компонента.
 * @returns {React.ReactNode} Компонент AlbumDescription.
 */
export const AlbumDescription = memo((props: AlbumDescriptionProps): React.ReactNode => {
	const {
		cover,
		title,
		artist,
		year,
		rating,
		className
	} = props;

	return (
		<div className={classNames(cls.AlbumDescription, {}, [className])}>
			<div className={cls.cover}>
				{/* Отображение обложки альбома */}
				<img src={cover} alt="Обложка альбома"/>
			</div>

			{/* Отображение информации об альбоме с валидацией на длину некоторых полей */}
			<div className={cls.wrapper}>
				<div className={cls.title}>{textLengthValidation(title, 25)}</div>
				<div className={cls.artist}>{textLengthValidation(artist, 25)}</div>
				<div className={cls.year}>{year}</div>
				<div className={cls.rating}>{rating}</div>
			</div>
		</div>
	);
});