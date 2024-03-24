import { BuildOptions } from './types/config';
import { buildScssLoader } from './loaders/buildScssLoader';


export const BuildLoaders = ({ isDev }: BuildOptions) => {

	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const babelLoader = {
		test: /\.(js|jsx|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	};

	const scssLoader = buildScssLoader(isDev);

	return [
		babelLoader,
		tsLoader,
		scssLoader
	];
};
