import 'babel-polyfill';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './index.css';

const Counter = React.memo((props) => {
  const [counter, setCount] = useState(0);

  return (
    <div>
      <span>计数：{counter}</span>
      <button onClick={() => {
        setCount(counter + 1);
      }}>递增</button>
    </div>
  );
});

const Message = (props) => {
  const [msg, setMsg] = useState(0);

  return (
    <div>
      {msg % 2 === 0 ? <div><div><Counter /></div></div> : <Counter />}
      <button onClick={() => {
        setMsg(msg + 1);
      }}>点我试试</button>
    </div>
  );
};

ReactDom.render(
  <Message />,
  document.getElementById('root')
);