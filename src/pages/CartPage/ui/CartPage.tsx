import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrderCart } from 'pages/CartPage/api/api';
import { CartAlbums } from 'widgets/CartAlbums';
import { useAlbumsCart } from 'entities/Cart';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CartPage.module.scss';

interface HomePageProps {
    className?: string
}


export const CartPage = ({ className }: HomePageProps) => {
	const navigate = useNavigate();
	const { cartContent } = useAlbumsCart('');

	const handleOrder = () => {
		if (!cartContent.length)
			return;

		fetchOrderCart();
		navigate('/home');
	};

	return (
		<div className={classNames(cls.HomePage, {}, [className])}>
			<div className={cls.wrapper}>
				Корзина
			</div>
			<CartAlbums className={cls.userAlbums} />

			<div className={cls.footer}>
				{!!cartContent.length && <button className={cls.orderButton} onClick={handleOrder}>
					Оформить заказ
				</button>}
				<div className={cls.price}>
					Всего: {cartContent?.reduce((acc, item) => acc + item.price, 0)}$
				</div>
			</div>
		</div>
	);
};

