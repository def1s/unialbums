import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AlbumsListPage } from 'pages/AlbumsListPage';
import { AlbumPage } from 'pages/AlbumPage';

// все маршруты
export enum Routes {
	MAIN = 'main',
	ALBUMS = 'albums',
	ALBUM = 'album',
	NOT_FOUND = 'notFound'
}

// все пути по маршрутам
export const RoutesPaths: Record<Routes, string> = {
	[Routes.MAIN]: '/',
	[Routes.ALBUMS]: '/albums',
	[Routes.ALBUM]: '/albums/:id',
	[Routes.NOT_FOUND]: '*'
};

// сборка маршрутов и путей
export const routerConfig: Record<Routes, RouteProps> = {
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <MainPage/>
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
