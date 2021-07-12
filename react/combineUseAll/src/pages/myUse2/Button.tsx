import { memo, useState } from 'react';
import useCounter, { CounterEnum } from './useCounter';

type Props = {
    name: string;
    mode: CounterEnum;
};

// memo可以使得只有props发生变化的时候才重新render
export default memo(function (props: Props) {
    let [mode, setMode] = useState(props.mode);
    let [counter, inc, dec] = useCounter(mode);
    console.log('Child Render');
    return (
        <div>
            <h2>{props.name}</h2>
            <div>{'当前mode为：' + mode + ',当前值为:' + counter}</div>
            <button onClick={inc}>加1</button>
            <button onClick={dec}>减1</button>
            <button
                onClick={() => {
                    if (mode == 'fish') {
                        setMode('cat');
                    } else {
                        setMode('fish');
                    }
                }}
            >
                {'切换mode'}
            </button>
        </div>
    );
});
