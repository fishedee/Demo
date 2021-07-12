import { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

//第三种改进方法，这种方法是糟糕的，虽然能用，但是
export default function () {
    let [refresh, setRefresh] = useState(false);
    let counterRef = useRef(0);

    useEffect(function () {
        let interval = setInterval(function () {
            //ref在每次render都是不变的，变化的仅仅是ref.current
            //因此，我们能在ref.current中获取最新值，而不是快照值
            //这种方法相当的Hack，不推荐这样用，也会打破view到store的单向流
            counterRef.current = counterRef.current + 1;
            //强行刷新
            setRefresh((prevState) => !prevState);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []); //组件挂载时只启动一次定时器，所以依赖是个空数组
    return (
        <div>
            <div>当前计数为：{counterRef.current}</div>
        </div>
    );
}
