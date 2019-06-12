const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	entry: {
		main: './src/js/main.js'
	},
	output: {
		chunkFilename: './js/[name].[hash].js',
		filename: './js/[name].[hash].js',
		path: path.resolve(__dirname, './dist')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: './css/[name].css',
			chunkFilename: './css/[id].css'
		}),
		new HtmlWebpackPlugin({
			inject: true,
			hash: true,
			template: './src/index.html',
			filename: './index.html',
			title: 'Code Sample App'
		}),
		new WebpackMd5Hash()
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		}, {
			test: /\.css%/,
			use: [{
				loader: process.env.NODE_ENV !== 'production' ? 'style-loader': MiniCssExtractPlugin.loader
			}, {
				loader: 'css-loader'
			}]
		}, {
			test:/\.scss%/,
			use: [{
				loader: process.env.NODE_ENV !== 'production' ? 'style-loader': MiniCssExtractPlugin.loader
			}, {
				loader: 'sass-loader?outputStyle=expanded&includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
			}, {
				loader: 'sass-resources-loader',
				options: {
					sourceMap: true,
					resources: [
						path.resolve(__dirname, 'src/sass/_base.scss')
					]
				}
			}]
		}, {
			test: /\.(gif|png|jpe?g|svg)$/i,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: './images',
					publicPath: '../images'
				}
			}, {
				loader: 'image-webpack-loader'
			}]
		}, {
			test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: './fonts',
					publicPath: '../fonts'
				}
			}]
		}]
	}
};
