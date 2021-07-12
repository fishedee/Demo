import { memo } from 'react';
import useCounter from './useCounter';

type Props = {
    name: string;
};

// memo可以使得只有props发生变化的时候才重新render，注意不包括state
export default memo(function (props: Props) {
    let [counter, inc, dec] = useCounter();
    console.log('Child Render');
    return (
        <div>
            <h2>{props.name}</h2>
            <div>{'当前值为:' + counter}</div>
            <button onClick={inc}>加1</button>
            <button onClick={dec}>减1</button>
        </div>
    );
});
