import { BuildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';
import path from 'path';
import webpack from 'webpack';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
	if (apiUrl) {
		return apiUrl;
	}

	return 'http://localhost:8081/api';
}

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src')
	};

	const mode: BuildMode = env.mode || 'development';
	const PORT = env.port || 3000;
	const isDev = mode === 'development';
	const apiUrl = getApiUrl(mode, env?.apiUrl);

	const config: webpack.Configuration = BuildWebpackConfig({
		mode,
		paths,
		port: PORT,
		isDev,
		apiUrl
	});

	return config;
};
