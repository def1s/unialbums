import cls from './AlbumCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import React, { FC, memo } from 'react';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { IAlbum } from 'entities/Albums/AlbumDescription/model/types/album';

/**
 * Определение свойств для компонента AlbumCard
 * @interface AlbumCardProps
 * @property {number} id - Идентификатор альбома
 * @property {string} cover - URL обложки альбома
 * @property {string} title - Название альбома
 * @property {string} artist - Имя исполнителя
 * @property {string} className - Дополнительные классы CSS для компонента
 */
interface AlbumCardProps extends IAlbum {
    className?: string
}

/**
 * Компонент AlbumCard для отображения информации об альбоме
 * @param {AlbumCardProps} props - Свойства компонента AlbumCard
 * @returns {React.ReactNode} - Возвращаемый React компонент
 */
export const AlbumCard: FC<AlbumCardProps> = memo((props: AlbumCardProps): React.ReactNode => {
	const {
		albumId,
		cover,
		title,
		artist,
		className,
		totalRating
	} = props;


	return (
		// Компонент Link используется для создания ссылки на страницу альбома
		<Link to={`/albums/${albumId}`} className={classNames(cls.AlbumCard, {}, [className])} key={albumId}>
			<div className={cls.cover}>
				<img src={cover} alt="Обложка альбома"/>
			</div>
			<div className={cls.title}>{textLengthValidation(title || '')}</div>
			<div className={cls.artist}>{textLengthValidation(artist || '')}</div>
			<div className={cls.divider}></div>
			<div className={cls.rating}>{totalRating}</div>
		</Link>
	);
});
