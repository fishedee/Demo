const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:{
		index:'./src/index.js',
	},

	output:{
		filename:'[name].js',
		chunkFilename: '[name].js',
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

	optimization:{
		splitChunks: {
			chunks: 'all',
			minSize: 1,
		    minChunks: 1,
		    maxAsyncRequests: 5,
		    maxInitialRequests: 3,
		    automaticNameDelimiter: '-',
		    name: true,
		    cacheGroups: {
		        vendors: {
		        	name:'vendors',
		            test: /[\\/]node_modules[\\/]/,
		            priority: -10
		        },
		        commons: {
		        	name:'commons',
		            minChunks: 2,
		            priority: -20,
		            reuseExistingChunk: true
		        }
		    }
		},
		runtimeChunk:{
			name:'webpack'
		},
	},

	plugins:[
		new htmlWebpackPlugin({
			filename:'index.html',
			chunks:['index','commons','vendors','webpack'],
			template:'./src/index.html',
		})
	],

	devServer:{
		compress: true
	}
}