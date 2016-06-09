'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',

	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src/js/transpiler.js')
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/ ,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015' ]
				}
			},

			{
				test: /\.css$/,
				exclude: /node_modules/ ,
				loaders: [ 'style', 'css' ]
			}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx', '.css' ],
		fallback: path.join(__dirname, 'node_modules')
	},

	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	}
};
