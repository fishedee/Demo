import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Button from 'antd/lib/button';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

ReactDom.render(<App/>,document.getElementById('root'));