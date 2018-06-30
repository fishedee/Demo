const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const isDevelopment = (args.mode == 'development');

module.exports = {
	entry:'./src/index.js',

	output:{
		filename:'index.js',
		path:path.resolve(__dirname,'dist')
	},
	devtool: isDevelopment?'inline-source-map':'',
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