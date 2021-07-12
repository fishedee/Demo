import { useEffect } from 'react';
import { useState } from 'react';

//第一种改进方法，勉强过得去
//将业务捕捉在setCounter里面，这样每次都能获取到最新值，但是对于跨状态的业务组件会出问题
export default function () {
    let [counter, setCounter] = useState(0);

    useEffect(function () {
        let interval = setInterval(function () {
            setCounter((prevState) => {
                return prevState + 1;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []); //组件挂载时只启动一次定时器，所以依赖是个空数组
    return (
        <div>
            <div>当前计数为：{counter}</div>
        </div>
    );
}
