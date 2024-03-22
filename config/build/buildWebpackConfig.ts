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
			filename: 'main.js',
			path: paths.build,
			clean: true
		},
		mode: mode,
		plugins: BuildPlugins(options),
		devServer: BuildDevServer(options),
	};
};

