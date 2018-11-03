/*
 * @Author: Jerrychan
 * @Date: 2018-10-29 14:01:27
 * @LastEditors: Jerrychan
 * @LastEditTime: 2018-10-29 14:04:45
 * @Description: 这是webpack配置文件
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		// favicon     : './favicon.ico',
		title: title,
		inject: true,
		hash: true,
		chunks: ['common', name],
	};
};

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
module.exports = {
	// entry: "./src/page/index/index.js",
	entry: {
		//通用模块
		common: ['./src/page/common/index.js'],
		login: ['./src/page/login/index.js'],
		index: ['./src/page/index/index.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//mall.52react.cn/',
		filename: 'js/[name].js'//必须[name] 不然冲突文件名一样
	},
	externals: {
		jquery: 'jQuery', //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
	},
	resolve: {
		//配置好路径之后  在js中引用文件可以缩写
		alias: {
			page: path.resolve(__dirname, 'src/page'),
			view: path.resolve(__dirname, 'src/view'),
			util: path.resolve(__dirname, 'src/util'),
			service: path.resolve(__dirname, 'src/service'),
			image: path.resolve(__dirname, 'src/image'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react'],
					},
				},
			},
			// css文件的处理
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				}),
			},
			// sass文件的处理
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader'],
				}),
			},
			// 图片的配置
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'images/[name].[ext]',
						},
					},
				],
			},
			// 字体图标的配置
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'resource/[name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		// 处理html文件
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login', '登录页')),
		// new HtmlWebpackPlugin({
		// 	template: './src/view/index.html',
		// }),
		// 独立css文件
		new ExtractTextPlugin('css/[name].css'),
		// 提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js',
		}),
	],
	devServer: {
		port: 8086,
		historyApiFallback: {
			index: '/dist/index.html', //404 或招不到则返回首页
		},
		open: true, //自动打开浏览器
		proxy: {
			'/product/list.do': {
				target: 'http://happymmall.com', //选择请求代理
				changeOrigin: true,
			},
			// "/user/logout.do": {
			//   target: "http://admintest.happymmall.com",
			//   changeOrigin: true
			// }
		},
	},
};
