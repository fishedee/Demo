import { Field } from '@formily/core';
import React, { ReactNode } from 'react';

// Input UI组件
export default (props: Field&{children:ReactNode[]}) => {
    return (
        <div
            {...props}
            style={{
                border: '2px solid rgb(186 203 255)',
            }}>
            <h2>{props.title}</h2>
            <div style={{padding:'10px'}}>{props.children}</div>
        </div>
    );
};
