import { Field } from '@formily/core';
import React from 'react';

// Label UI组件
export default (props: Field) => {
    return (
        <div
            {...props}
            style={{
                width: '100%',
                height: 28,
                padding: '0 5px',
            }}
        >
            {props.value ? props.value : ''}
        </div>
    );
};
