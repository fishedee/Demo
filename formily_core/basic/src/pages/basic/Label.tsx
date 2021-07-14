import React from 'react';
import { FieldType } from './Context';

// Input UI组件
export default (props: FieldType) => {
    return (
        <div
            {...props}
            style={{
                border: '2px solid rgb(186 203 255)',
                borderRadius: 6,
                width: '100%',
                height: 28,
                padding: '0 5px',
            }}
        >
            {props.value ? props.value : ''}
        </div>
    );
};
