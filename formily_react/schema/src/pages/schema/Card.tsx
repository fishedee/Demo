import { Field, ObjectField } from '@formily/core';
import { useField } from '@formily/react';
import React, { ReactNode, useContext } from 'react';

// Input UI组件
export default (props: { children: ReactNode }) => {
    const field = useField();
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <h2>{field.title}</h2>
            <div style={{ padding: '10px' }}>{props.children}</div>
        </div>
    );
};
