const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'./src/index.js',

	output:{
		filename:'[name]-[hash].js',
		chunkFilename: '[name]-[contenthash].js',
		path:path.resolve(__dirname,'dist')
	},

	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:['env','react','stage-0'],
					plugins:[
						'transform-decorators-legacy',
						'transform-runtime',
						["import", { "libraryName": "antd", "style": "css" }]
					]
				}
			},
			{
				test:/\.less$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader',options: { importLoaders: 1 ,modules:true}},
					{loader:'less-loader'},
				]
			},
			{
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'}
				]
			}
		]
	},

	plugins:[
		new htmlWebpackPlugin({
			filename:'index.html',
			title:'antd admin',
			template:'./src/index.html',
		}),
	],

	devServer:{
		compress: true,
		proxy:{
			"/": {
				target:"http://www.baidu.com",
				changeOrigin: true
			}
		}
	}
}