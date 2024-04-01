import { RouteProps } from 'react-router-dom';
import { WelcomePage } from 'pages/WelcomePage';
import { HomePage } from 'pages/HomePage';
import { AlbumPage } from 'pages/AlbumPage';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
}

// все маршруты
export enum Routes {
	WELCOME = 'welcome',
	HOME = 'home',
	ALBUM = 'album',
	NOT_FOUND = 'notFound'
}

// все пути по маршрутам
export const RoutesPaths: Record<Routes, string> = {
	[Routes.WELCOME]: '/',
	[Routes.HOME]: '/home',
	[Routes.ALBUM]: '/albums/:id',
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
	[Routes.NOT_FOUND]: {
		path: RoutesPaths.notFound,
		element: <div>404</div>
	}
};
