import { ChangeEventHandler, LegacyRef, useEffect } from 'react';
import { useRef } from 'react';
import { memo, useState, useCallback, forwardRef } from 'react';

type MyInputProps = {
    value: string | undefined;
    onChange: ChangeEventHandler<HTMLInputElement>;
};
const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
    //将ref直接透传到input组件上面
    return (
        <div>
            <h1>我是Input</h1>
            <input
                ref={ref}
                style={{ border: '1px solid black' }}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
});
export default function Sample1() {
    const [state, setState] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
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
                    inputRef.current?.focus();
                }}
            >
                获取焦点
            </button>
            <input value="测试2" />
        </div>
    );
}
