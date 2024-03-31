import { RouteProps } from 'react-router-dom';
import { WelcomePage } from 'pages/WelcomePage';
import { AlbumsListPage } from 'pages/AlbumsListPage';
import { AlbumPage } from 'pages/AlbumPage';

// все маршруты
export enum Routes {
	WELCOME = 'welcome',
	ALBUMS = 'albums',
	ALBUM = 'album',
	NOT_FOUND = 'notFound'
}

// все пути по маршрутам
export const RoutesPaths: Record<Routes, string> = {
	[Routes.WELCOME]: '/',
	[Routes.ALBUMS]: '/albums',
	[Routes.ALBUM]: '/albums/:id',
	[Routes.NOT_FOUND]: '*'
};

// сборка маршрутов и путей
export const routerConfig: Record<Routes, RouteProps> = {
	[Routes.WELCOME]: {
		path: RoutesPaths.welcome,
		element: <WelcomePage/>
	},
	[Routes.ALBUMS]: {
		path: RoutesPaths.albums,
		element: <AlbumsListPage/>
	},
	[Routes.ALBUM]: {
		path: RoutesPaths.album,
		element: <AlbumPage/>
	},
	[Routes.NOT_FOUND]: {
		path: RoutesPaths.notFound,
		element: <div>404</div>
	}
};
