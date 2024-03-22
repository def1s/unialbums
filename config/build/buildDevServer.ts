import { BuildOptions } from './types/config';


export const BuildDevServer = ({ port }: BuildOptions) => {

	return {
		port: port,
		open: true, // автоматически открывает в браузере страницу с приложением
		historyApiFallback: true, // чтобы не падало при перезагрузке на маршруте
		hot: true
	};
};
