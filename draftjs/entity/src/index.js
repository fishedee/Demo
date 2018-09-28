import React from 'react';
import ReactDom from 'react-dom';
import {convertToRaw,
  CompositeDecorator,
  Editor,
  EditorState,
  RichUtils,} from 'draft-js';
import style from './index.css';

//内容结构
//blockMap 块元素信息，包含一个characterList，每个字符代表一个character
//每个character最多只有一个entity的id
//entityMap,entity的id对应的entity信息，包含类型，可修改性，和附带数据
//selectionAfter 选择内容的尾部
//selectionBefore 选择内容的头部
class LinkEditorExample extends React.Component {
  constructor(props) {
    super(props);
    //设置指定的entity的显示方式
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showURLInput: false,
      urlValue: '',
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(content.toJS(),convertToRaw(content));
    };
    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
  }
  _promptForLink(e) {
    console.log('_promptForLink',this);
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      //获取当前位置的entitiy
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }
  _confirmLink(e) {
    e.preventDefault();
    const {editorState, urlValue} = this.state;
    const contentState = editorState.getCurrentContent();
    //entity的参数，第一个类型，第二个修改属性，第三个是附带数据
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue,ref:this}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    //设置指定位置的link的entity
    //第一个参数是包含了新entity的的contentState，
    //第二个参数是指定的位置
    //第三个参数是entity的key
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }
  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }
  _removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }
  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>;
    }
    return (
      <div style={styles.root}>
        <div style={{marginBottom: 10}}>
          Select some text, then use the buttons to add or remove links
          on the selected text.
        </div>
        <div style={styles.buttons}>
          <button
            onMouseDown={this.promptForLink}
            style={{marginRight: 10}}>
            Add Link
          </button>
          <button onMouseDown={this.removeLink}>
            Remove Link
          </button>
        </div>
        {urlInput}
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref="editor"
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}
function findLinkEntities(contentBlock, callback, contentState) {
  //遍历每个character对应的entity
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
const Link = (props) => {
  //展示entity为LINK的元素
  const {url,ref} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link} onClick={ref._promptForLink.bind(ref)}>
      {props.children}
    </a>
  );
};
const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};


ReactDom.render(
	(<LinkEditorExample/>),
	document.getElementById('root')
);