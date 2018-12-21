import React from 'react';
import ReactDom from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import style from './index.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }
  highlight = (str)=>{
    var list = [];
    var isInAt = false;
    for( var i = 0 ;i != str.length ;i ++ ){
      if( isInAt == false && str.charAt(i) == '$'){
        isInAt = true;
      }else if( isInAt == true && str.charAt(i) == '$'){
        isInAt = false;
      }
      if( isInAt == false ){
        list.push(0);
      }else{
        list.push(1);
      }
    }
    return list;
  }
  onChange = (editorState)=>{
    var content = editorState.getCurrentContent();
    var blocks = content.getBlockMap();
    var time1 = performance.now();
    var changeBlockKey = [];
    for( var [key,block] of blocks.entries() ){
      var chars = block.getCharacterList();
      var text = block.getText();
      var hightLightResult = this.highlight(text);
      var i = 0
      var shouldChange = false;
      for( var record of chars ){
        var single = hightLightResult[i];
        i++;
        if( record.get('style').has('BOLD') && single == 0 ){
          shouldChange = true;
        }
        if( !record.get('style').has('BOLD') && single == 1 ){
          shouldChange = true;
        }
      }
      if( shouldChange ){
        changeBlockKey.push(key);
      }
    }
    var newBlocks = blocks;
    for( var i in changeBlockKey){
      var singleKey = changeBlockKey[i];
      newBlocks = newBlocks.update(singleKey,(block)=>{
        var chars = block.getCharacterList();
        var text = block.getText();
        var hightLightResult = this.highlight(text);
        var newChars = chars.map(function(record,i){
          var single = hightLightResult[i];
          var result = null;
          if( single == 1 ){
            result = record.updateIn(['style'],function(e){
              return e.add('BOLD')
            })
          }else{
            result = record.updateIn(['style'],function(e){
              return e.clear()
            })
          }
          return result;
        })
        return block.set('characterList',newChars);
      })
    }
    var time2 = performance.now();
    const selection = editorState.getSelection();
    var newContent = content.merge({
      blockMap:newBlocks,
      selectionBefore:selection,
      selectionAfter:selection,
    });
    var newEditorState = EditorState.push(
        editorState,
        newContent,
        'change-inline-style',
    );
    var time3 = performance.now();
    console.log(time2-time1,time3-time2);
    this.setState({
      editorState:newEditorState
    });
  }
  render() {
    return (
    	<div className={style.editor} >
	        <Editor
	        	placeholder={"请输入文字"}
	        	editorState={this.state.editorState} 
	        	onChange={this.onChange} />
        </div>
    );
  }
}


ReactDom.render(
	(<MyEditor/>),
	document.getElementById('root')
);