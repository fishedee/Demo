var express = require('express');
var app = express();

var router = [
	//普通路由
	'/index',
	'/index.html',
	'/index/123',
	'/123',
	//参数路由
	'/list',
	'/list/123',
	'/list/:userId',
	//正则路由
	'/ab?cd',
	'/ab+cd',
];

function getRouter(name){
	var expressRouter = express.Router({
		caseSensitive:true
	});
	for( var i in router ){
		var single = router[i];
		(function(single){
			expressRouter.get(single,function(req,res,next){
				console.log('get '+name+" "+single)
				res.send(single);
				next();
			})
		})(single);
	}
	return expressRouter;
}

app.use('/',getRouter('/'))
app.use('/list',getRouter('/list'))
app.use('/ab/:cd',getRouter('/ab/:cd'))
app.use('/cd+',getRouter('/cd+'))
app.use('/',function(req,resp,next){
	console.log('use /');
	next();
})
app.use('/list',function(req,resp,next){
	console.log('use /list');
	next();
})


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});