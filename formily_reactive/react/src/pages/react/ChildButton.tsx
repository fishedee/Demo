import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { useState } from 'react';
import CounterStore, { CounterEnum } from './Store';

type Props = {
    name: string;
    mode: CounterEnum;
};

export default observer((props: Props) => {
    let [mode, setMode] = useState<{ value: CounterEnum }>(() => {
        return observable({
            value: props.mode,
        });
    });
    let counter = CounterStore.get(mode.value);
    console.log('Child Render');
    return (
        <div>
            <h2>{props.name}</h2>
            <div>{'当前mode为：' + mode.value + ',当前值为:' + counter}</div>
            <button onClick={CounterStore.inc.bind(CounterStore, mode.value)}>
                加1
            </button>
            <button onClick={CounterStore.dec.bind(CounterStore, mode.value)}>
                减1
            </button>
            <button
                onClick={() => {
                    if (mode.value == 'fish') {
                        mode.value = 'cat';
                    } else {
                        mode.value = 'fish';
                    }
                }}
            >
                {'切换mode'}
            </button>
        </div>
    );
});
