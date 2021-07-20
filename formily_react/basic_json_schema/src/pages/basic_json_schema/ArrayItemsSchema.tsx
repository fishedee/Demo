import { ArrayField, Field } from '@formily/core';
import { observer } from '@formily/reactive-react';
import React, { ReactNode, useContext } from 'react';
import { ReactElement } from 'react';
import { FieldContext } from './Context';
import { FieldSchemaContext, RecursionField } from './Schema';

export default observer(() => {
    const fieldSchema = useContext(FieldSchemaContext);
    const field = useContext(FieldContext) as ArrayField;
    console.log('render arrayitem ', field.value);
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <div style={{ padding: '10px' }}>
                {field.value.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <RecursionField
                                    onlyRenderProperties={false}
                                    schema={(fieldSchema as any).items}
                                    name={index + ''}
                                />
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
