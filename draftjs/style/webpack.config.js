const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

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
					{loader:'css-loader'}
				]
			},
		]
	},

	plugins:[
		new htmlWebpackPlugin({
			template:'./src/index.html',
		})
	],

	devServer:{
		compress: true,
	}
}