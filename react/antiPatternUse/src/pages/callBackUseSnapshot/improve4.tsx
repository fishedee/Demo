import { useEffect, useState } from 'react';
import EventEmiter from './EventEmiter';

class CounterStore extends EventEmiter<number> {
    constructor() {
        super(0);
    }
    public inc = () => {
        this.set(this.get() + 1);
    };

    public dec = () => {
        this.set(this.get() - 1);
    };
}
let store = new CounterStore();

function useCounter() {
    let [counter, setCounter] = useState(store.get());

    useEffect(function () {
        let emiterId = store.subscribe((data) => {
            setCounter(data);
        });
        return () => {
            store.unsubscribe(emiterId);
        };
    }, []);

    return [counter, store.inc, store.dec] as const;
}

//第四种方法，这种方法是最好的，允许在跨组件中共享状态，而且清晰明了，同时避免在view层写业务逻辑
export default function () {
    let [counter, inc, dec] = useCounter();

    useEffect(function () {
        let interval = setInterval(function () {
            inc();
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
