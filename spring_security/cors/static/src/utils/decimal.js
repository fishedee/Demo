import Big from 'big.js';

function getDecimal(a){
	if( a == "" || a == "-"){
		a = "0"
	}
	return new Big(a);
}

String.newDecimal = function(r){
	try{
		let m = getDecimal(r)
		return m.toString()
	}catch(e){
		return new Error(e)
	}
}

String.prototype.addDecimal = function(r){
	var left = getDecimal(this);
	var right = getDecimal(r);
	return left.plus(right).toString();
}

String.prototype.subDecimal = function(r){
	var left = getDecimal(this);
	var right = getDecimal(r);
	return left.minus(right).toString();
}

String.prototype.mulDecimal = function(r){
	var left = getDecimal(this);
	var right = getDecimal(r);
	return left.times(right).toString();
}

String.prototype.divDecimal = function(r){
	var left = getDecimal(this);
	var right = getDecimal(r);
	return left.div(right).toString();
}

String.prototype.roundDecimal = function(precison){
	var left = getDecimal(this);
	return left.round(precison).toString();
}

String.prototype.cmpDecimal = function(r){
	var left = getDecimal(this);
	var right = getDecimal(r);
	return left.cmp(right)
}

String.prototype.signDecimal = function(){
	return this.cmpDecimal("0")
}

String.prototype.absDecimal = function(){
	var left = getDecimal(this);
	return left.abs().toString()
}