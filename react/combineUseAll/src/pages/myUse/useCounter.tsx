import { useEffect } from 'react';
import { useState } from 'react';
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

export default function useCounter() {
    let [counter, setCounter] = useState(store.get());

    //加入[]依赖符，仅在首次render的时候进行subscribe操作
    useEffect(function () {
        let emiterId = store.subscribe((data) => {
            //setCounter是稳定的，每次render返回的都是同一个setCounter
            //如果setCounter传入的参数不变，那么就不会触发render，注意这种不变仅仅是浅比较的不变
            setCounter(data);
        });
        return () => {
            store.unsubscribe(emiterId);
        };
    }, []);

    return [counter, store.inc, store.dec] as const;
}
