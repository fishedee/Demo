import React from 'react';
import { FieldType } from './Context';

// Label UI组件
export default (props: FieldType) => {
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
