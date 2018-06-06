var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(cookieParser());
app.use(session({
	resave:true,
	saveUninitialized:true,
	secret:'zcv',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/get/:userId',function(req,res){
	res.json({
		params:req.params,
		query:req.query,
		cookies:req.cookies,
		session:req.session,
		body:req.body,
	})
})

app.get('/setCookie',function(req,res){
	res.cookie('name','Fish')
	res.json({ok:true})
})

app.get('/setSession',function(req,res){
	req.session['name'] = 'fish';
	res.json({ok:true})
})

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});