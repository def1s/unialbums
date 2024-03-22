import cls from './AlbumCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';

export interface AlbumCardProps {
	id: number,
	cover: string,
	title: string,
	artist: string,
	rating: number,
    className?: string
}

export const AlbumCard: FC<AlbumCardProps> = (props) => {
	const {
		id,
		cover,
		title,
		artist,
		rating,
		className
	} = props;

	return (
		<Link to={'/'} className={classNames(cls.AlbumCard, {}, [className])} key={id}>
			<div className={cls.cover}>
				<img src={cover} alt="Обложка альбома"/>
			</div>
			<div className={cls.title}>{title}</div>
			<div className={cls.artist}>{artist}</div>
			<div className={cls.divider}></div>
			<div className={cls.rating}>{rating}</div>
		</Link>
	);
};
