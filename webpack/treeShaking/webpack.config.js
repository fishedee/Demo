const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "production",
	entry:'./src/index.js',

	output:{
		filename:'[name]-[hash].js',
		path:path.resolve(__dirname,'dist')
	},

	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:[['env',{modules:false}],'react','stage-0']
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
		    	antd: {
		        	name:'antd',
		            test: /[\\/]node_modules[\\/]_antd/,
		            priority: 11
		        },
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
			template:'./src/index.html',
		})
	],

	devServer:{
		compress: true
	}
}