import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from "webpack";

export const BuildPlugins = ({ paths, isDev }: BuildOptions) => {

	return [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev)
		}),
		new webpack.ProgressPlugin(),
		new webpack.HotModuleReplacementPlugin()
	];
};
