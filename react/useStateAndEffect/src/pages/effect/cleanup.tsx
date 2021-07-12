import { useEffect } from 'react';
import { useState } from 'react';

export default function EffectPage() {
    let [counter, setCounter] = useState<number>(0);

    //因为effect每次在render都会重新触发
    useEffect(() => {
        console.log('add interval ');
        var i = 0;
        document.title = '计算器' + counter;
        let interval = setInterval(() => {
            document.title = '计算器' + counter + '!'.repeat(i);
            i++;
        }, 500);

        //每次新的effect替换旧的时候，就会调用旧effect的清理函数来清理
        return () => {
            console.log('clean interval');
            clearInterval(interval);
        };
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
