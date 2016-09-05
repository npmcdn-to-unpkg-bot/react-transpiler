'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const PORT = 3333;
const HOST = 'localhost';

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res) {
	res.send(
		`
		<div id="root" />
		<script src='https://unpkg.com/babel-standalone@6/babel.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js'></script>
		<script src="static/bundle.js"></script>
		`
	);
});

app.listen(PORT, HOST, err => {
	if (err) {
		console.log(`Error: ${err}`);

		process.exit(1);
	}

	console.log(`Dev server running at http://${HOST}:${PORT}`);
});
