const path = require('path');

module.exports = {
	entry:'./src/index.js',

	output:{
		filename:'index.js',
		path:path.resolve(__dirname,'dist')
	},
	devtool: 'inline-source-map',
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
	}
}