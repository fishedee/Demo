var express = require('express');
var app = express();
var logger = require('morgan');

app.use(function(req,res,next){
	console.log('Time:', Date.now());
	next();
})

function normal(){
	app.use('/a',function(req,res,next){
		console.log('/a');
		next();
	})

	app.use('/a',function(req,res,next){
		console.log('/a2');
		next();
	})

	app.use('/a',function(req,res,next){
		console.log('/a3');
		res.send('Hello World End');
	})
}

function multiNoraml(){
	app.use('/b',function(req,res,next){
		console.log('/b');
		next();
	})

	app.use('/c',function(req,res,next){
		console.log('/c');
		next();
	})

	app.use('/b?c?',function(req,res,next){
		console.log('/b?c?');
		res.send('/b?c?');
	})
}

function functionNormal(){
	app.use('/d',function(req,res,next){
		console.log('/d1');
		next();
	},function(req,res,next){
		console.log('/d2');
		next();
	},function(req,res,next){
		console.log('/d3');
		res.send('/d3');
	})
}

function methodNormal(){
	app.get('/e',function(req,res,next){
		console.log('get /e');
		next();
	})
	app.post('/e',function(req,res,next){
		console.log('post /e');
		next();
	})
	app.all('/e',function(req,res,next){
		res.send('all /e');
	})
}

function endByNoNext(){
	app.use('/h',function(req,res,next){
		console.log('use /h1');
		next();
	})
	app.use('/h',function(req,res,next){
		console.log('use /h2');
		res.send('Hello h2');
	})
	app.use('/h',function(req,res,next){
		console.log('use /h3');
		res.send('Hello h3')
	})
}

function endByRouter(){
	app.use('/k',function(req,res,next){
		console.log('use /k1');
		next();
	})
	app.get('/k',[function(req,res,next){
		console.log('use /k2');
		next('route');
		console.log('use /k3')
	},function(req,res,next){
		console.log('use /k4');
		res.send('Hello k4')
	}])
	app.use('/k',function(req,res,next){
		console.log('use /k5');
		res.send('Hello k5')
	})
}
function endByError(){
	app.use('/i?j?',function(err,req,res,next){
		console.log(err);
		next();
	})
	//i error
	app.use('/i',function(req,res,next){
		console.log('use /i1');
		next();
	})
	app.use('/i',function(req,res,next){
		console.log('use /i2');
		throw new Error('123');
	})
	app.use('/i',function(req,res,next){
		console.log('use /i3');
		res.send('Hello i3')
	})
	//j error
	app.use('/j',function(req,res,next){
		console.log('use /j1');
		next();
	})
	app.use('/j',function(req,res,next){
		console.log('use /j2');
		next(new Error('456'));
	})
	app.use('/j',function(req,res,next){
		console.log('use /j3');
		res.send('Hello j3')
	})
}

function neverEnd(){
	app.get('/f',function(req,res,next){

	})

	app.use('/g',function(req,res,next){
		console.log('use /g');
		next();
	})
	app.get('/g',function(req,res,next){
		console.log('get /g');
	})
}

function thridPartyMiddleware(){
	var router = express.Router();
	router.use(express.static("."));
	router.use(logger())
	router.use('/',function(req,res,next){
		res.send('Hello Thridparty');
	})
	app.use('/l',router);
}


normal();
multiNoraml();
functionNormal();
methodNormal();
endByNoNext();
endByRouter();
endByError();
neverEnd();
thridPartyMiddleware();


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});