import { memo, useState, useCallback, useMemo } from 'react';

type Props = {
    name: string;
    onClick: () => void;
};

let ChildButton = memo((props: Props) => {
    console.log('Child Button Render');
    return <button onClick={props.onClick}>{props.name}</button>;
});
export default function CounterPage() {
    let [mode, setMode] = useState('fish');
    let [counter, setCounter] = useState(0);
    let [counter2, setCounter2] = useState(0);
    let inc = useCallback(function () {
        setCounter((prevState) => {
            return prevState + 1;
        });
    }, []);
    let inc2 = useCallback(function () {
        setCounter2((prevState) => {
            return prevState + 1;
        });
    }, []);
    let total = useMemo(
        function () {
            console.log('expensive sum');
            let result = 0;
            for (var i = 0; i != 10; i++) {
                result += counter + counter2;
            }
            return result;
        },
        [counter, counter2],
    );
    console.log('Top Render');
    return (
        <div>
            <div>当前的mode为：{mode}</div>
            <button onClick={() => setMode(mode + '!')}>更新mode</button>
            <div>当前的counter为：{counter}</div>
            <ChildButton onClick={inc} name="计数器1" />
            <div>当前的counter2为：{counter2}</div>
            <ChildButton onClick={inc2} name="计数器2" />
            <div>{'总数为：' + total}</div>
        </div>
    );
}
