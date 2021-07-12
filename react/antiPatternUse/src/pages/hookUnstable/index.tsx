import { useState } from 'react';

//所有的Hook都不应该放在条件语句或者for循环中，它们都应该在代码前面首先声明使用
//因为Hook的实现依赖于声明的顺序
//Rendered more hooks than during the previous render.
export default function () {
    let mode = 'nothing';
    let [counter, setCounter] = useState(0);
    if (counter > 0) {
        let [innerMode, setMode] = useState('cat');
        mode = innerMode;
    }

    return (
        <div>
            <div>当前计数为：{counter}</div>
            <button
                onClick={() => {
                    setCounter((prevState) => prevState + 1);
                }}
            >
                +
            </button>
            {counter > 0 ? <div>mode</div> : null}
        </div>
    );
}
