const $ = require('jquery');

var container = $('<div class="container"></div>');
var list = [];
var maxKey = 1;

//需要自己控制上下左右键，回车键和删除键，并且鼠标不能全选多行文字
//好处是可控性比较强
function addDiv(target,current){
	var newChild = $('<div contenteditable="true" class="item"></div>');
	var newData = {
		key:maxKey,
		target:newChild,
	}
	maxKey = maxKey + 1;
	if( list.length == 0 ){
		container.append(newChild);
	}else{
		target.after(newChild[0]);
	}
	list.splice(current,0,newData);
	newChild.on('keydown',function(e){
		console.log(e.keyCode);
		if( e.keyCode == 13 ){
			e.preventDefault();
			var curIndex = -1;
			for( var i in list ){
				var single = list[i];
				if( single.key == newData.key ){
					curIndex = i;
					break
				}
			}
			addDiv(list[curIndex].target,curIndex);
		}else if( e.keyCode == 8 ){
			var curIndex = -1;
			for( var i in list ){
				var single = list[i];
				if( single.key == newData.key ){
					curIndex = i;
					break
				}
			}
			if( list[curIndex].target.text().length != 0 ||
				list.length == 1 ){
				return
			}
			list[curIndex].target.remove();
			list.splice(curIndex,1);
			list[curIndex].target.focus();
		}
	});
	newChild.focus();
}
addDiv(null,0);

$('#target').append(container);