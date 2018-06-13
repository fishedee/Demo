const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'./src/index.js',

	output:{
		filename:'index.js',
		path:path.resolve(__dirname,'dist')
	},

	resolve: {
	    extensions: ['.vue','.js']
	},

	module:{
		rules:[
			{
				test:/\.vue$/,
				exclude:/node_modules/,
				loader:'vue-loader'
			},
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
			}
		]
	},

	plugins:[
		new VueLoaderPlugin(),
		new htmlWebpackPlugin({
			title:'vuex',
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