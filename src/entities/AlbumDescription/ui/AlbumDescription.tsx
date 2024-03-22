import cls from './AlbumDescription.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { FC } from 'react';

interface AlbumDescriptionProps {
	cover: string,
	title: string,
	artist: string,
	year: number,
	rating: number,
    className?: string
}

export const AlbumDescription: FC<AlbumDescriptionProps> = (props) => {
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
				<img src={cover} alt="Обложка альбома"/>
			</div>

			<div className={cls.wrapper}>
				<div className={cls.title}>{title}</div>
				<div className={cls.artist}>{artist}</div>
				<div className={cls.year}>{year}</div>
				<div className={cls.rating}>{rating}</div>
			</div>
		</div>
	);
};
