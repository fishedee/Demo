import { memo, useCallback, useState } from 'react';

type Props = {
    name: string;
    onClick: () => void;
};

let ChildButton = memo((props: Props) => {
    console.log('Child Button Render');
    return <button onClick={props.onClick}>{props.name}</button>;
});
export default function CounterPage() {
    let [counter, setCounter] = useState(0);
    let [counter2, setCounter2] = useState(0);
    //使用了useCallback以后，仅在首次的时候使用闭包，而后都会缓存这个闭包，从而避免不必要的渲染
    //但是每次render，闭包依然生成，只是不用它而已
    //依赖参数像useEffect一样的用法
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
