import { useEffect } from 'react';
import { useState } from 'react';

export default function EffectPage() {
    let [open, setOpen] = useState(false);
    let [counter, setCounter] = useState(0);

    //useEffect没有参数的时候，代表每次都会在render后重新触发
    //effect的语义，render是一个UI=render(state)的纯函数，那么effect就是纯函数以外的副作用
    //即使触发的状态按钮，也会使得useEffect的运行
    useEffect(() => {
        console.log('reset document title!');
        document.title = '计算器' + counter;
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
