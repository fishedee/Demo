import React from 'react';
import ReactDom from 'react-dom';
import {Editor, EditorState,getDefaultKeyBinding} from 'draft-js';
import style from './index.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  handleKeyCommand = (command)=>{
    if (command === 'myeditor-save') {
      alert("mysave!");
      return false;
    }
    return false;
  }
  myKeyBindingFn = (e)=>{
  if (e.keyCode === 83 ) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  }
  render() {
    return (
    	<div className={style.editor} >
	        <Editor
            //按键命令处理
            handleKeyCommand={this.handleKeyCommand}
            //按键信息处理
            keyBindingFn={this.myKeyBindingFn}
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