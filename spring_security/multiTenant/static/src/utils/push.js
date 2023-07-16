var Push = (function(){

var encoder = new TextEncoder("utf-8");
var decoder = new TextDecoder("utf-8");
function encodeUTF8(s) {
	return encoder.encode(s);
}

function decodeUTF8(bytes) {
	return decoder.decode(bytes);
}

function Publisher(addr){
	return {
		send:function(topic,data){
			var body = "topic="+encodeURIComponent(topic)+"&data="+encodeURIComponent(data)
			var request = new Request("http://"+addr+"/publisher/send", {
			       method: 'POST', 
			       headers:{  
			       		'Access-Control-Allow-Origin': '*',
	                    'Content-Type': 'application/x-www-form-urlencoded'  
	               },
			       body:body,
			})
			return fetch(request);
		}
	}
}

var MessageType = {
	SUBSCRIBE:1,
	UNSUBSCRIBE:2,
	TEXT:3,
};

function writeMessage(ws,message,messageSize){
	var messageString = JSON.stringify(message);
	var data = messageString.length+" "+messageString;
	var array = encodeUTF8(data);
	for( var begin = 0 ; begin < array.length ; ){
		var end = begin + messageSize;
		if( end > array.length ){
			end = array.length;
		}
		var length = end - begin;
		var sendArray = new Uint8Array(length);
		sendArray.set(array.subarray(begin,end),0);
		ws.send(sendArray.buffer);
		begin = end;
	}
}

function readMessage(evt,currentReadInfo){
	var data = evt.data;
	if( data instanceof ArrayBuffer == false){
		throw new Error("invalid data type"+typeof(data))
	}
	if( currentReadInfo == null ){
		var array = new Uint8Array(data);
		var blankIndex = -1;
		for( var i = 0 ;i != array.length ; i++){
			if( array[i] == 32){
				blankIndex = i;
				break;
			}
		}
		if (blankIndex == -1){
			throw new Error("invalid message type, no blank")
		}
		var size = parseInt(decodeUTF8(array.subarray(0,blankIndex)));
		var currentArray = array.subarray(blankIndex+1,array.length);
		var isOk = (currentArray.length >= size);
		return {
			isOk:isOk,
			array:currentArray,
			size:size,
		};
	}else{
		var newArray = new Uint8Array(data);
		var oldArray = currentReadInfo.array;
		var resultArray = new Uint8Array(oldArray.length+newArray.length);
		resultArray.set(oldArray);
		resultArray.set(newArray,oldArray.length);
		var isOk = (resultArray.length >= currentReadInfo.size);
		var size = currentReadInfo.size;
		var result =  {
			isOk:isOk,
			array:resultArray,
			size:size,
		};
		if( result.isOk == false){
			return result;
		}
		var msg = JSON.parse(decodeUTF8(result.array));
		if( msg.type != MessageType.TEXT ){
			throw new Error("invalid message type: "+ msg.type)
		}
		result.topic = msg.topic;
		result.payload = msg.payload;
		return result;
	}
}

function Subscriber(addr,messagSize){
	var ws = new WebSocket("wss://"+addr+"/subscriber");
	ws.binaryType = 'arraybuffer';
	var closeHandler = null;
	var errorHandler = null;
	var topicHandler = {};
	var currentReadInfo = null;
	var writeMessageList = [];
	var hasConnect = false;

	function write(msg){
		if( hasConnect ){
			writeMessage(ws,msg,messagSize);
		}else{
			writeMessageList.push(msg);
		}
	}

	var subscriber = {
		onTopic:function(topic,handler){
			write({
				type:MessageType.SUBSCRIBE,
				topic:topic,
				payload:null,
			});
			topicHandler[topic] = handler
		},
		offTopic:function(topic){
			write({
				type:MessageType.UNSUBSCRIBE,
				topic:topic,
				payload:null,
			});
			delete topicHandler[topic];
		},
		onClose:function(handler){
			closeHandler = handler;
		},
		onError:function(handler){
			errorHandler = handler;
		},
		close:function(){
			ws.close();
		}
	}
	ws.onopen = function(evt){
		console.log("websocket open!");
		hasConnect = true;
		for( var i = 0 ; i != writeMessageList.length ; i++ ){
			writeMessage(ws,writeMessageList[i],messagSize);
		}
		writeMessageList = [];
	}
	ws.onmessage = function(evt){
		currentReadInfo = readMessage(evt,currentReadInfo);
		if(currentReadInfo.isOk == false){
			return;
		}
		var topic = currentReadInfo.topic;
		var payload = currentReadInfo.payload;
		var handler = topicHandler[topic];
		console.log("websocket message "+topic);
		if( handler != null ){
			handler(payload);
		}
		currentReadInfo = null;
	}
	ws.onclose = function(){
		console.log("websocket close");
		if( closeHandler != null ){
			closeHandler();
		}
	}
	ws.onerror = function(){
		console.log("websocket error");
		if( errorHandler != null ){
			errorHandler();
		}
	}
	return subscriber;
}

function ForeverSubscriber(addr,messagSize){
	var subscriber = null;
	var topicHandler = {};
	var foreverSubscriber = {
		onTopic:function(topic,handler){
			topicHandler[topic] = handler
			if( subscriber != null ){
				subscriber.onTopic(topic,handler);
			}
		},
		offTopic:function(topic){
			delete topicHandler[topic];
			if( subscriber != null ){
				subscriber.offTopic(topic);
			}
		}
	}
	function run(){
		subscriber = new Subscriber(addr,messagSize);
		function reconnect(){
			if( subscriber == null ){
				return;
			}
			subscriber.close();
			subscriber = null;
			console.log("websocket close,will reconnect in 10s");
			setTimeout(run,10000);
		}
		subscriber.onError(reconnect);
		subscriber.onClose(reconnect);
		for( var i in topicHandler ){
			subscriber.onTopic(i,topicHandler[i]);
		}
	}
	run();
	return foreverSubscriber;
}

function Push(addr,messagSize){
	return {
		createPublisher:function(){
			return new Publisher(addr);
		},
		createSubscriber:function(){
			return new Subscriber(addr,messagSize);
		},
		createForeverSubscriber:function(){
			return new ForeverSubscriber(addr,messagSize);
		}
	}
}

return Push;

})();


if( typeof window !== "undefined" ){
	window["Push"] = Push;
}else{
	module.exports = Push;
}