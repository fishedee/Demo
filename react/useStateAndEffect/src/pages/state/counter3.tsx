import { useState } from 'react';

//useState的初始值可以是一个闭包，用来计算初始值
export default function Couter3Page() {
    let [counter, setCounter] = useState(() => {
        return 1 + 1;
    });
    return (
        <div>
            <div>当前的counter为：{counter}</div>
            <button
                onClick={() => {
                    setCounter((prevCount) => prevCount + 1);
                }}
            >
                加
            </button>
            <button
                onClick={() => {
                    setCounter((prevCount) => prevCount - 1);
                }}
            >
                减
            </button>
        </div>
    );
}
