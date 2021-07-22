import React from 'react';
import {
    Input,
    Select,
    FormItem,
    FormLayout,
    Form,
    FormGrid,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        FormGrid,
    },
});

const form = createForm();

export default () => {
    let description = `
    FormGrid通过限制maxColumns来控制每行有多少个组件
    `;
    return (
        <div style={{ margin: '30px', border: '1px solid black' }}>
            <Form form={form} labelWidth={100}>
                <pre>{description}</pre>
                <SchemaField>
                    <SchemaField.Void
                        x-component="FormGrid"
                        x-component-props={{
                            maxColumns: 2,
                        }}
                    >
                        <SchemaField.String
                            name="input"
                            title="输入框"
                            x-decorator="FormItem"
                            x-decorator-props={{}}
                            x-component="Input"
                            required
                        />
                        <SchemaField.String
                            name="input2"
                            title="输入框2"
                            x-decorator="FormItem"
                            x-decorator-props={{}}
                            x-component="Input"
                            required
                        />
                        <SchemaField.String
                            name="input3"
                            title="输入框3"
                            x-decorator="FormItem"
                            x-decorator-props={{
                                gridSpan: 2,
                            }}
                            x-component="Input"
                            required
                        />
                    </SchemaField.Void>
                </SchemaField>
            </Form>
        </div>
    );
};
