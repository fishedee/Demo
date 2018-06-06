var express = require('express');
var app = express();

app.set('jsonp callback name', 'cb');

app.get('/status',function(req,res){
	res.status('201').end()
})

app.get('/header',function(req,res){
	res.set('PoweredBy','Fish')
	res.end()
})

app.get('/send',function(req,res){
	res.send('Hello World')
})

app.get('/json',function(req,res){
	res.json({
		code:0,
		msg:'',
		data:'Hello World'
	})
})

app.get('/jsonp',function(req,res){
	res.jsonp({
		code:0,
		msg:'',
		data:'Hello World'
	})
})

app.get('/redirect',function(req,res){
	res.redirect('/json')
})

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});