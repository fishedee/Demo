const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:['./src/index.js','./static/favicon.ico'],

	output:{
		filename:'index.js',
		path:path.resolve(__dirname,'dist')
	},
	//devTool必须设置为非eval才能捕获到error
	devtool:'',
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:['env','react','stage-0'],
					plugins:['transform-runtime']
				}
			},
			{
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'}
				]
			},
			{
				test:/static\/.*$/,
				loader:'file-loader',
				options:{
					name:"[name].[ext]"
				}
			}
		]
	},

	plugins:[
		new htmlWebpackPlugin({
			template:'./src/index.html',
		})
	],

	devServer:{
		compress: true,
		proxy:{
			"/": {
				target:"https://www.baidu.com",
				changeOrigin: true
			}
		}
	}
}