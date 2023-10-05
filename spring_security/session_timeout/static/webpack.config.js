const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isDevelopment = (args.mode == 'development');

const theme = {
}
let webpackConfig = {
	entry:'./src/index.js',

	output:{
		filename:'[name]-[hash].js',
		chunkFilename: '[name]-[contenthash].js',
		path:path.resolve(__dirname,'dist')
	},

	devtool: '',
	
	resolve:{
		alias: {
	      '@': path.resolve(__dirname,'src'),
	      'art-template':path.resolve(__dirname,'node_modules/art-template/lib/template-web.js')
	    }
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
						'transform-decorators-legacy',
						'transform-runtime',
						["import", { "libraryName": "antd", "style": true }]
					]
				}
			},
			{
				test:/\.less$/,
				exclude:/node_modules/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader',options: { importLoaders: 1 ,modules:true}},
					{loader:'less-loader',options:{modifyVars:theme,javascriptEnabled: true}},
				]
			},
			{
				test:/\.less$/,
				include:/node_modules/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader',options: { importLoaders: 1}},
					{loader:'less-loader',options:{modifyVars:theme,javascriptEnabled: true}},
				]
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
		new cleanWebpackPlugin(['dist']),
		new htmlWebpackPlugin({
			filename:'index.html',
			title:'管理系统',
			template:'./src/index.html',
		}),
		new copyWebpackPlugin([{
			from:__dirname+'/public',
			to:__dirname+'/dist',
		}])
	],

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
				}
			}
		},
		runtimeChunk:{
			name:'webpack'
		}
	},
	

	devServer:{
		host: '0.0.0.0',
    	disableHostCheck: true,
		compress: true,
		port:9596,
		proxy:{
			"/": {
				target:"http://localhost:9595",
				changeOrigin: true
			}
		}
	}
}

if( !isDevelopment ){
	webpackConfig.output.publicPath = "https://yinghaostatic.fishedee.com"
}

if( !isDevelopment ){
	//webpackConfig.plugins.push(new BundleAnalyzerPlugin());
} 

module.exports = webpackConfig;