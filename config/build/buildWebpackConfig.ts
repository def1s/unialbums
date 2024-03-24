import { BuildOptions } from './types/config';
import { BuildLoaders } from './buildLoaders';
import { BuildResolvers } from './buildResolvers';
import { BuildPlugins } from './buildPlugins';
import { BuildDevServer } from './buildDevServer';


export const BuildWebpackConfig = (options: BuildOptions) => {
	const { mode, paths } = options;

	return {
		module: {
			rules: BuildLoaders(options)
		},
		resolve: BuildResolvers(options),
		entry: paths.entry,
		output: {
			filename: '[name][contenthash].js',
			path: paths.build,
			clean: true,
			publicPath: '/' // фикс проблемы с вложенными маршрутами
		},
		mode: mode,
		plugins: BuildPlugins(options),
		devServer: BuildDevServer(options),
	};
};

