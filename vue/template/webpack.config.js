const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'./src/index.js',

	output:{
		filename:'index.js',
		path:path.resolve(__dirname,'dist')
	},

	/*
	//这个是当使用运行时的vue compile时使用
	resolve: {
        alias: {
            'vue': 'vue/dist/vue.min.js'
        }
    },
    */

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
			title:'vue',
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