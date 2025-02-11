import React from 'react';
import CartIcon from 'shared/assets/icons/cart.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import { RoutesPaths } from 'shared/config/routerConfig/routerConfig';

export interface SidebarItemsType {
	path: string;
	text: string;
	Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const sidebarItemsList: SidebarItemsType[] = [
	{
		Icon: HomeIcon,
		path: RoutesPaths.home,
		text: 'Главная'
	},
	{
		Icon: CartIcon,
		path: RoutesPaths.cart,
		text: 'Корзина'
	}
];
