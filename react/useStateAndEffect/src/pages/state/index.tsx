import { useState } from 'react';

//useState的简单使用
type MyType = 'fish' | 'cat';
export default function UserPage() {
    let [type, setType] = useState<MyType>('fish');
    return (
        <div>
            <div>当前的type为：{type}</div>
            <button
                onClick={() => {
                    setType('fish');
                }}
            >
                更改为fish
            </button>
            <button
                onClick={() => {
                    setType('cat');
                }}
            >
                更改为cat
            </button>
        </div>
    );
}
