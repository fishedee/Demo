import { useEffect } from 'react';
import { useRef } from 'react';
import { memo, useState, useCallback } from 'react';

export default function CounterPage() {
    //refresh组件用来强行刷新的
    const [refresh, setRefresh] = useState(false);

    let myRef = useRef({ counter: 0 });
    let inc = useCallback(() => {
        myRef.current.counter++;
        setRefresh((prevState) => !prevState);
    }, []);

    let dec = useCallback(() => {
        myRef.current.counter--;
        setRefresh((prevState) => !prevState);
    }, []);
    return (
        <div>
            <div>计数器为：{myRef.current.counter}</div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
