const $ = require('jquery');
const editor = $('#editor');

function getChildNodes(element){
	var result = [];
	for( var i = 0 ;i != element.childNodes.length ; i++){
		var node = element.childNodes[i];
		if( node.nodeType == Node.TEXT_NODE ){
			result.push({
				text:node.nodeValue,
				node:node,
			});
		}else if( node.nodeType == Node.ELEMENT_NODE ){
			var temp = getChildNodes(node)
			result.push(...temp);
		}else{
			throw new Error("unkown node type")
		}
	}
	return result
}

function getSelection(nodes){
	const sel = window.getSelection();
	var beginIndex = 0
	var endIndex = 0
	var index = 0
	for( var i in nodes ){
		var node = nodes[i];
		if( node.node == sel.anchorNode ){
			beginIndex = index + sel.anchorOffset;
		}
		if( node.node == sel.focusNode ){
			endIndex = index + sel.focusOffset;
		}
		index += node.text.length;
	}
	console.log(sel,beginIndex,endIndex);
	return {beginIndex:beginIndex,endIndex:endIndex}
}

function setSelection(nodes,selection){
	var beginNode = null;
	var beginIndex = 0;
	var endNode = null;
	var endIndex = 0;
	var index = 0;
	console.log(selection);
	for( var i in nodes ){
		var node = nodes[i];
		var curBegin = index;
		var curEnd = index + node.text.length;
		if( curBegin <= selection.beginIndex && selection.beginIndex <= curEnd ){
			beginNode = node.node;
			beginIndex = selection.beginIndex - curBegin;
		}
		if( curBegin <= selection.endIndex && selection.endIndex <= curEnd ){
			endNode = node.node;
			endIndex = selection.endIndex - curBegin;
		}
		index += node.text.length;
	}
	const sel = window.getSelection();
	sel.setBaseAndExtent(beginNode,beginIndex,endNode,endIndex);
}

function getHighlight(childNodes){
	var text = '';
	for( var i in childNodes ){
		var single = childNodes[i];
		text += single.text
	}
	const words = text.split(/[\s\n]/)
	var html = [];
	for( var i in words ){
		if( words[i] == 'bold'){
			html.push('<strong>'+words[i]+'</strong>');
		}else if( words[i] == 'red'){
			html.push('<span style="color:red">'+words[i]+'</span>');
		}else{
			html.push(words[i]);
		}
	}
	return html.join(' ');
}

function update(){
	var childNodes = getChildNodes(editor[0]);
	var selection = getSelection(childNodes);
	var html = getHighlight(childNodes);
	editor.html(html);
	var newChildNodes = getChildNodes(editor[0]);
	setSelection(newChildNodes,selection);
	
}

editor.on('input',update);
update();