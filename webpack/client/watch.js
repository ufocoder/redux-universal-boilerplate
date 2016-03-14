var _ = require('lodash');
var webpack = require("webpack");
var config = require("./config");
var wds = {
	hostname: process.env.HOSTNAME || "localhost",
	port: process.env.PORT || 8080
};

config.entry.unshift(
	"webpack-dev-server/client?http://" + wds.hostname + ":" + wds.port,
	"webpack/hot/only-dev-server"
);

config.devServer = {
	publicPath: "http://" + wds.hostname + ":" + wds.port + "/dist",
	hot: true,
	inline: false,
	lazy: false,
	quiet: true,
	noInfo: true,
	headers: {
		"Access-Control-Allow-Origin": "*"
	},
	stats: {
		colors: true
	},
	host: wds.hostname
};

module.exports = _.merge(config, {
	cache: true,
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	output: {
		publicPath: config.devServer.publicPath,
		hotUpdateMainFilename: "update/[hash]/update.json",
		hotUpdateChunkFilename: "update/[hash]/[id].update.js",
	},
	plugins: [
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__PRODUCTION__: process.env.NODE_ENV === "production",
			__DEV__: process.env.NODE_ENV !== "production"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
});

