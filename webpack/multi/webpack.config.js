const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:{
		index:'./src/index.js',
		index2:'./src/index2.js',
	},

	output:{
		filename:'[name].js',
		path:path.resolve(__dirname,'dist')
	},

	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:['env','react','stage-0']
				}
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
			chunks:['index'],
			template:'./src/index.html',
		}),
		new htmlWebpackPlugin({
			filename:'index2.html',
			chunks:['index2'],
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