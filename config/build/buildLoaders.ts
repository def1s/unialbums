import { BuildOptions } from './types/config';
import { buildScssLoader } from './loaders/buildScssLoader';


export const BuildLoaders = ({ isDev }: BuildOptions) => {

	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const scssLoader = buildScssLoader(isDev);

	return [
		tsLoader,
		scssLoader
	];
};
