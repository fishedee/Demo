const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry:['./src/index.js'],

	output:{
		filename:'index.js',
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
						'transform-runtime'
					]
				}
			},
			{
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader',options:{modules:true}}
				]
			},
		]
	},

	plugins:[
		new htmlWebpackPlugin({
			template:'./src/index.html',
		}),
		new copyWebpackPlugin([{
			from:__dirname+'/public',
			to:__dirname+'/dist'
		}])
	],

	devServer:{
		compress: true,
		host: '0.0.0.0',
		disableHostCheck: true,
	}
}