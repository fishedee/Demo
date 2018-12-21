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

function update(){
	var childNodes = getChildNodes(editor[0]);
	var text = '';
	for( var i in childNodes ){
		var single = childNodes[i];
		text += ' '+single.text
	}
	const words = text.split(/[\s\n]/)
	var html = '';
	for( var i in words ){
		if( words[i] == 'bold'){
			html += ' <strong>'+words[i]+'</strong>';
		}else if( words[i] == 'red'){
			html += ' <span style="color:red">'+words[i]+'</span>';
		}else{
			html += ' '+words[i]
		}
	}
	editor.html(html);
}

editor.on('input',update);
update();