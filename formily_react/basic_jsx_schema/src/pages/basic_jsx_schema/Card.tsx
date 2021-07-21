import { Field, ObjectField } from '@formily/core';
import React, { ReactNode, useContext } from 'react';
import { FieldContext } from './Context';

// Input UI组件
export default (props: Field & { children: ReactNode[] }) => {
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <h2>{props.title}</h2>
            <div style={{ padding: '10px' }}>{props.children}</div>
        </div>
    );
};
