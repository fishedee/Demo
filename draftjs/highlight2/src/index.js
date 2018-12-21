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
      if( isInAt == false && str.charAt(i) == '@'){
        isInAt = true;
      }else if( isInAt == true && str.charAt(i) == ' '){
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
    var newBlocks = blocks.map((block)=>{
      var chars = block.getCharacterList();
      var text = block.getText();
      var hightLightResult = this.highlight(text);
      var newChars = chars.map(function(record,i){
        var single = hightLightResult[i];
        var result = null;
        if( single == 1 ){
          result = record.updateIn(['style'],function(e){
            return e.add('UNDERLINE')
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