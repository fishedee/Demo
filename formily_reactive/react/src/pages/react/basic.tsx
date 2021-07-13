import React from 'react';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

const obs = observable({
    value: 'Hello world',
});

//对函数组件的包装，只要函数的组件任意一个observable变量变化时，就会自动刷新该函数组件
export default observer(() => {
    return (
        <div>
            <div>
                <input
                    style={{
                        height: 28,
                        padding: '0 8px',
                        border: '2px solid #888',
                        borderRadius: 3,
                    }}
                    value={obs.value}
                    onChange={(e) => {
                        obs.value = e.target.value;
                    }}
                />
            </div>
            <div>{obs.value}</div>
        </div>
    );
});
