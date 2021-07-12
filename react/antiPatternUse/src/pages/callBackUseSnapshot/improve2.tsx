import { useEffect, useReducer } from 'react';
import { useState } from 'react';

//第二种改进方法，这种不错，对于只是内部使用的状态，不需要跨组件共享的状态最好
//将业务捕捉在setCounter里面，
export default function () {
    let [counter, dispatch] = useReducer((state: number, action: string) => {
        if (action == 'inc') {
            return state + 1;
        }
        return state;
    }, 0);

    useEffect(function () {
        let interval = setInterval(function () {
            dispatch('inc');
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
