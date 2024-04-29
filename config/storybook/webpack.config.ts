import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
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
	config?.resolve?.modules?.push(paths.src);
	config?.resolve?.extensions?.push('.ts', '.tsx');

	// для работы с css и scss
	config?.module?.rules?.push(buildScssLoader(true));

	// для работы с svg

	config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/i };
		}

		return rule;
	});

	config?.module?.rules?.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});

	// объявление глобальных переменных
	config?.plugins?.push(new DefinePlugin({
		__IS_DEV__: true,
		__API_URL__: JSON.stringify('http://localhost:8081/api')
	}));

	return config;
};
