import React, { FC, memo, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlbumsCart } from 'entities/Cart';
import { classNames } from 'shared/lib/classNames/classNames';
import { textLengthValidation } from 'shared/lib/textLengthValidator/textLengthValidator';
import { IAlbum } from 'shared/types';
import cls from './AlbumCard.module.scss';

/**
 * Определение свойств для компонента CategoryCard
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
 * Компонент CategoryCard для отображения информации об альбоме
 * @param {AlbumCardProps} props - Свойства компонента CategoryCard
 * @returns {React.ReactNode} - Возвращаемый React компонент
 */
export const AlbumCard: FC<AlbumCardProps> = memo((props: AlbumCardProps): React.ReactNode => {
	const navigate = useNavigate();
	const {
		albumId,
		cover,
		title,
		artist,
		price,
		isSold,
		className
	} = props;
	const { isInCart, AddToCart, RemoveFromCart } = useAlbumsCart(albumId.toString());

	const handlClickCard = (event: MouseEvent<HTMLDivElement>) => {
		navigate(`/albums/${albumId}`);
	};

	const handleClickCart = (event: MouseEvent) => {
		event.stopPropagation();

		if (isInCart) {
			RemoveFromCart();
		} else {
			AddToCart();
		}
	};

	return (
		// Компонент Link используется для создания ссылки на страницу альбома
		<div onClick={handlClickCard} className={classNames(cls.AlbumCard, {}, [className])} key={albumId}>
			<div className={cls.cover}>
				<img src={cover} alt="Обложка альбома"/>
			</div>
			<div className={cls.title}>{textLengthValidation(title || '')}</div>
			<div className={cls.artist}>{textLengthValidation(artist || '')}</div>
			<div className={cls.divider}></div>
			{!isSold &&
				<>
					<div className={cls.cost}>{price ?? 400}$</div>
					<button className={cls.cartButton} onClick={handleClickCart}>
						{!isInCart ? 'В корзину' : 'Убрать из корзины'}
					</button>
				</>
			}
			{isSold && <div className={cls.sold}> Продано </div> }
		</div>
	);
});
