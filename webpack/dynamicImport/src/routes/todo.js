import React from 'react';
import Header from './header';
import { connect } from 'redva';

class Todo extends React.PureComponent {
  state = {
    text: '',
  };
  onChange(e) {
    this.setState({ text: e.target.value });
  }
  add() {
    this.props.dispatch({
      type: 'todo/add',
      text: this.state.text,
    });
  }
  del(id) {
    this.props.dispatch({
      type: 'todo/del',
      id: id,
    });
  }
  render() {
    return (
      <div>
        <Header title={"todo页面"}/>
        <input
          type="text"
          placeholder={'添加todo的数据'}
          onChange={this.onChange.bind(this)}
          value={this.state.text}
        />
        <button onClick={this.add.bind(this)}>添加</button>
        {this.props.todo.map(todo => (
          <div key={todo.id}>
            {todo.text}
            <button onClick={this.del.bind(this, todo.id)}>删除</button>
          </div>
        ))}
      </div>
    );
  }
}
export default connect(state => ({ todo: state.todo }))(Todo);
