import { useEffect } from 'react';
import { useState } from 'react';
import EventEmiter from '@/pages/myUse/EventEmiter';
import { useCallback } from 'react';

export type CounterEnum = 'fish' | 'cat';
type CounterObject = {
    [key in CounterEnum]: number;
};
class CounterStore extends EventEmiter<CounterObject> {
    constructor() {
        super({
            fish: 0,
            cat: 0,
        });
    }

    public inc = (target: CounterEnum) => {
        let data = this.get();
        //注意要返回新的对象，不能在原来的对象上面改
        data = {
            ...data,
            [target]: data[target] + 1,
        };
        this.set(data);
    };

    public dec = (target: CounterEnum) => {
        let data = this.get();
        data = {
            ...data,
            [target]: data[target] - 1,
        };
        this.set(data);
    };
}
let store = new CounterStore();

export default function useCounter(target: CounterEnum) {
    let [counter, setCounter] = useState(store.get()[target]);

    //加入[]依赖符，仅在首次render的时候进行subscribe操作
    useEffect(
        function () {
            let emiterId = store.subscribe((data) => {
                setCounter(data[target]);
            });
            //切换以后，要set一次
            setCounter(store.get()[target]);
            return () => {
                store.unsubscribe(emiterId);
            };
        },
        [target],
    );

    //useCallback可以缓存每次不同的callback
    let inc = useCallback(
        function () {
            store.inc(target);
        },
        [target],
    );

    let dec = useCallback(
        function () {
            store.dec(target);
        },
        [target],
    );

    return [counter, inc, dec] as const;
}
