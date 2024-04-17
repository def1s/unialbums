import { RouteProps } from 'react-router-dom';
import { WelcomePage } from 'pages/WelcomePage';
import { HomePage } from 'pages/HomePage';
import { AlbumPage } from 'pages/AlbumPage';
import { AddAlbumPage } from 'pages/AddAlbumPage';
import { ProfilePage } from 'pages/ProfilePage';

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
	[Routes.NOT_FOUND]: {
		path: RoutesPaths.notFound,
		element: <div>404</div>
	}
};
