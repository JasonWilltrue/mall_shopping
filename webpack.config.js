
const path = require('path');

//处理html模板
let htmlWebpackPlugin = require('html-webpack-plugin');
//处理共用、通用的js
let webpack = require('webpack');
//css单独打包
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// 获取html-webpack-plugin参数的方法
let getHtmlConfig = function(name, title) {
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

module.exports = {
	//    entry: './src/app.js',
	entry: {
		//通用模块
		common: ['./src/page/common/index.js'],
		login: ['./src/page/login/index.js'],
		index: ['./src/page/index/index.js'],
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js',
	},
	//将外部变量或者模块加载进来
	externals: {
		jquery: 'window.jQuery',
	},
	resolve: {
		//配置好路径之后  在js中引用文件可以缩写
		alias: {
			node_modules:path.resolve(__dirname, 'node_modules'),
			page: path.resolve(__dirname, 'src/page'),
			view: path.resolve(__dirname, 'src/view'),
			util: path.resolve(__dirname, 'src/util'),
			service: path.resolve(__dirname, 'src/service'),
			image: path.resolve(__dirname, 'src/image'),
		},
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				//以下目录不处理
				exclude: /node_modules/,
				//只处理以下目录
				include: /src/,
				loader: 'babel-loader',
				//配置的目标运行环境（environment）自动启用需要的 babel 插件
				query: {
					presets: ['env', 'react'],
				},
			},
			//css 处理这一块
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						//'style-loader',
						{
							loader: 'css-loader',
							options: {
								//支持@important引入css
								importLoaders: 1,
							},
						}
					],
				}),
			},
			//less 处理这一块
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						//'style-loader',
						{
							loader: 'css-loader',
							options: {
								//支持@important引入css
								importLoaders: 1,
							},
						},
						'less-loader',
					],
				}),
			},
			 // 图片的配置
			 {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            // loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
            loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
            options: {
              name: "./images"
            }
          }
        ]
      },
       // 字体图标的配置
       {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
						loader: "url-loader?limit=8192&name=font/[hash:8].[name].[ext]",
            options: {
              name: "./font"
            }
          }
        ]
      }
		],
	},
	plugins: [
	
		new htmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new htmlWebpackPlugin(getHtmlConfig('login', '登录页')),
		// 独立通用模块到js/common.js
		new webpack.optimize.CommonsChunkPlugin({
			//公共块的块名称
			name: 'common',
			//生成的文件名
			filename: 'js/common.js',
		}),
		//css 单独打包到文件
		new ExtractTextPlugin('css/[name].css'),
	],
	devServer: {
		port: 8086,
		historyApiFallback: {
			index: '/dist/view/index.html', //404 或招不到则返回首页
		},
		open: true, //自动打开浏览器
		proxy: {
			'/product/list.do': {
				target: 'http://happymmall.com', //选择请求代理
				changeOrigin: true,
			},
		// 	// "/user/logout.do": {
		// 	//   target: "http://admintest.happymmall.com",
		// 	//   changeOrigin: true
		// 	// }
		 },
	}
};
