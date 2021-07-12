import { useEffect } from 'react';
import { useState } from 'react';

export default function EffectPage() {
    let [open, setOpen] = useState(false);
    let [counter, setCounter] = useState(0);

    //effect可以带有一个dependence参数，只有参数里面的引用没变时，才会触发副作用
    //这个时候，触发状态按钮，不会再次触发effect了
    //只有在触发加减按钮的时候，才会触发effect
    useEffect(() => {
        console.log('reset document title!');
        document.title = '计算器' + counter;
    }, [counter]);

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
