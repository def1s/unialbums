import { RouteProps } from 'react-router-dom';
import { AddAlbumPage } from 'pages/AddAlbumPage';
import { AdminPage } from 'pages/AdminPage';
import { AlbumPage } from 'pages/AlbumPage';
import { CartPage } from 'pages/CartPage';
import { CategoryPage } from 'pages/CategoryPage';
import { HomePage } from 'pages/HomePage';
import { ProfilePage } from 'pages/ProfilePage';
import { WelcomePage } from 'pages/WelcomePage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
}

// все маршруты
export enum Routes {
	WELCOME = 'welcome',
	HOME = 'home',
	ALBUM = 'album',
	ADD_ALBUM = 'addAlbum',
	PROFILE = 'profile',
	CATEGORY = 'category',
	CART = 'cart',
	ADMIN = 'admin',
	// последний
	NOT_FOUND = 'notFound'
}

// все пути по маршрутам
export const RoutesPaths: Record<Routes, string> = {
	[Routes.WELCOME]: '/',
	[Routes.HOME]: '/home',
	[Routes.ALBUM]: '/albums/:id',
	[Routes.ADD_ALBUM]: '/addAlbum',
	[Routes.PROFILE]: '/profile',
	[Routes.CATEGORY]: '/category/:category',
	[Routes.CART]: '/cart',
	[Routes.ADMIN]: '/admin',
	// последний
	[Routes.NOT_FOUND]: '*'
};

// сборка маршрутов и путей
export const routerConfig: Record<Routes, AppRoutesProps> = {
	[Routes.WELCOME]: {
		path: RoutesPaths.welcome,
		element: <WelcomePage/>
	},
	[Routes.HOME]: {
		path: RoutesPaths.home,
		element: <HomePage/>,
		authOnly: true
	},
	[Routes.ALBUM]: {
		path: RoutesPaths.album,
		element: <AlbumPage/>,
		authOnly: true
	},
	[Routes.ADD_ALBUM]: {
		path: RoutesPaths.addAlbum,
		element: <AddAlbumPage/>,
		authOnly: true
	},
	[Routes.PROFILE]: {
		path: RoutesPaths.profile,
		element: <ProfilePage/>,
		authOnly: true
	},
	[Routes.CATEGORY]: {
		path: RoutesPaths.category,
		element: <CategoryPage/>,
		authOnly: true
	},
	[Routes.CART]: {
		path: RoutesPaths.cart,
		element: <CartPage/>,
		authOnly: true
	},
	[Routes.ADMIN]: {
		path: RoutesPaths.admin,
		element: <AdminPage/>,
		authOnly: true
	},
	[Routes.NOT_FOUND]: {
		path: RoutesPaths.notFound,
		element: <div>404</div>
	}
};
