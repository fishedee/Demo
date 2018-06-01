import { connect } from 'redva';
import Header from './header';
import React from 'react';

class Counter extends React.PureComponent {
  inc() {
    this.props.dispatch({
      type: 'counter/inc',
    });
  }
  dec() {
    this.props.dispatch({
      type: 'counter/dec',
    });
  }
  render() {
    return (
      <div>
        <Header title={"counter页面"}/>
        <div>{this.props.counter}</div>
        <button onClick={this.inc.bind(this)}>+</button>
        <button onClick={this.dec.bind(this)}>-</button>
      </div>
    );
  }
}

export default connect(state => {
  return { 
    counter: state.counter 
  }
})(Counter);

