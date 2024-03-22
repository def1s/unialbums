import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';

// все маршруты
export enum Routes {
	MAIN = 'main'
}

// все пути по маршрутам
export const RoutesPaths: Record<Routes, string> = {
	[Routes.MAIN]: '/'
};

// сборка маршрутов и путей
export const routerConfig: Record<Routes, RouteProps> = {
	[Routes.MAIN]: {
		path: RoutesPaths.main,
		element: <MainPage/>
	}
};
