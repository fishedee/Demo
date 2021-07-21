import { ArrayField, Field } from '@formily/core';
import { useField } from '@formily/react';
import { observer } from '@formily/reactive-react';
import React, { ReactNode, useContext } from 'react';
import { ReactElement } from 'react';

type PropsType = Field & {
    children: (index: number) => ReactElement;
};
export default observer((props: PropsType) => {
    const field = useField<ArrayField>();
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <div style={{ padding: '10px' }}>
                {field.value?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>
                                {field.componentProps.childrenRender(index)}
                            </div>
                            <button
                                onClick={() => {
                                    field.remove(index);
                                }}
                            >
                                删除
                            </button>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={() => {
                    field.push({});
                }}
            >
                添加一行
            </button>
        </div>
    );
});
