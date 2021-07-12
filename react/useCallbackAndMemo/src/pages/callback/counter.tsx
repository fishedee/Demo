import { memo, useState } from 'react';

type Props = {
    name: string;
    onClick: () => void;
};

//即使用了memo，但是依然是每次两个Button都重绘，因为每次onClick的实例都不同
let ChildButton = memo((props: Props) => {
    console.log('Child Button Render');
    return <button onClick={props.onClick}>{props.name}</button>;
});
export default function CounterPage() {
    let [counter, setCounter] = useState(0);
    let [counter2, setCounter2] = useState(0);
    let inc = function () {
        setCounter((prevState) => {
            return prevState + 1;
        });
    };
    let inc2 = function () {
        setCounter2((prevState) => {
            return prevState + 1;
        });
    };
    console.log('Top Render');
    return (
        <div>
            <div>当前的counter为：{counter}</div>
            <ChildButton onClick={inc} name="计数器1" />
            <div>当前的counter2为：{counter2}</div>
            <ChildButton onClick={inc2} name="计数器2" />
        </div>
    );
}
