import React from 'react';
import ReactDom from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import style from './index.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
    	<div className={style.editor} >
	        <Editor
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