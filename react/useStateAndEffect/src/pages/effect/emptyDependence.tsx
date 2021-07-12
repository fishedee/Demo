import { useEffect } from 'react';
import { useState } from 'react';

export default function EffectPage() {
    let [open, setOpen] = useState(false);
    let [counter, setCounter] = useState(0);

    //effect的dependence为空的时候，整个组件只会触发一次
    useEffect(() => {
        console.log('reset document title!');
        document.title = '计算器' + counter;
    }, []);

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
            <button
                onClick={() => {
                    setOpen((prevOpen) => !prevOpen);
                }}
            >
                状态：{open ? '打开' : '关闭'}
            </button>
        </div>
    );
}
