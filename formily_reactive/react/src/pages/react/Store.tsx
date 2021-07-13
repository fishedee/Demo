import { model } from '@formily/reactive';

export type CounterEnum = 'fish' | 'cat';
let CounterStore = model({
    fish: 0,
    cat: 0,
    inc(type: CounterEnum) {
        this[type]++;
    },
    dec(type: CounterEnum) {
        this[type]--;
    },
    get(type: CounterEnum) {
        return this[type];
    },
});

//去除字段，在编译层，禁止调用字段
type CounterType<T> = Omit<T, 'fish' | 'cat'>;

function extractMethod<T>(a: T): CounterType<T> {
    return (a as unknown) as CounterType<T>;
}

export default extractMethod(CounterStore);
