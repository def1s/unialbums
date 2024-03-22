import webpack from 'webpack';
import { BuildPaths } from '../build/types/config';
import path from 'path';
import { buildScssLoader } from '../build/loaders/buildScssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
	// переопределяю конфиг, чтобы storybook умел работать с абсолютными путями
	const paths: BuildPaths = {
		src: path.resolve(__dirname, '..', '..', 'src'),
		html: '',
		build: '',
		entry: ''
	};
	config.resolve.modules.push(paths.src);
	config.resolve.extensions.push('.ts', '.tsx');

	// для работы с css и scss
	config.module.rules.push(buildScssLoader(true));

	return config;
};
