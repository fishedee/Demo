import { useState } from 'react';

//Counter的使用，将setCounter传入新值
export default function CounterPage() {
    let [counter, setCounter] = useState(0);
    let incCounter = function () {
        setCounter(counter + 1);
    };
    let decCounter = function () {
        setCounter(counter - 1);
    };
    return (
        <div>
            <div>当前的counter为：{counter}</div>
            <button onClick={incCounter}>加</button>
            <button onClick={decCounter}>减</button>
        </div>
    );
}
