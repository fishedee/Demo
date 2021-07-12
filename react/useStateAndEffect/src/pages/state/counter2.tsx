import { useState } from 'react';

//setCounter可以传入一个闭包，获取旧值，然后返回新值
export default function Counter2Page() {
    let [counter, setCounter] = useState(0);
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
