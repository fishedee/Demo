import {
    ChangeEventHandler,
    LegacyRef,
    useEffect,
    useImperativeHandle,
} from 'react';
import { useRef } from 'react';
import { memo, useState, useCallback, forwardRef } from 'react';

type MyInputProps = {
    value: string | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

type MyInputRef = {
    myFocus: () => void;
};
const MyInput = forwardRef<MyInputRef, MyInputProps>((props, ref) => {
    const myRef = useRef<HTMLInputElement>(null);

    //创建组件自身的ref，赋予更多的灵活性
    useImperativeHandle(ref, () => ({
        myFocus: () => {
            myRef.current?.focus();
        },
    }));
    return (
        <div>
            <h1>我是Input2</h1>
            <input
                ref={myRef}
                style={{ border: '1px solid black' }}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
});
export default function Sample1() {
    const [state, setState] = useState('');
    const inputRef = useRef<MyInputRef>(null);
    return (
        <div>
            <div>你好</div>
            <MyInput
                ref={inputRef}
                value={state}
                onChange={(e) => {
                    setState(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    inputRef.current?.myFocus();
                }}
            >
                获取焦点2
            </button>
            <input value="测试2" />
        </div>
    );
}
