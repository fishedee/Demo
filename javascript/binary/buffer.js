function newBuffer(){
	var buffer = Buffer.from("Hello World");
	for( var i = 0 ; i != buffer.byteLength ;i ++ ){
		console.log(buffer[i]);
	}
	buffer[0] = "M".charCodeAt(0);
	var buffer2 = Buffer.from("CCDXXX");
	var buffer3 = Buffer.concat([buffer,buffer2]);
	return buffer3.slice(0,15);
}

function toString(buffer){
	return buffer.toString('utf-8');
}

function toArrayBuffer(buffer){
	return buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength);
}

function toUint8Array(buffer){
	return new Uint8Array(buffer.buffer,buffer.byteOffset,buffer.byteLength);
}

var buffer = newBuffer();
console.log(toString(buffer));
console.log(toArrayBuffer(buffer));
console.log(toUint8Array(buffer));