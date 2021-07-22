import React from 'react';
import { Input, Select, FormItem, FormLayout, Form } from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
    },
});

const form = createForm();

export default () => {
    let description = `
    仅仅修改每个FormItem的labelCol与wrapperCol并不能成为inline的布局
    `;
    return (
        <div style={{ padding: '30px' }}>
            <Form form={form}>
                <pre>{description}</pre>
                <SchemaField>
                    <SchemaField.String
                        name="input"
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{
                            labelCol: 5,
                            wrapperCol: 6,
                        }}
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="input2"
                        title="输入框2"
                        x-decorator="FormItem"
                        x-decorator-props={{
                            labelCol: 5,
                            wrapperCol: 6,
                        }}
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="input3"
                        title="输入框3"
                        x-decorator="FormItem"
                        x-decorator-props={{
                            labelCol: 5,
                            wrapperCol: 18,
                        }}
                        x-component="Input"
                        required
                    />
                </SchemaField>
            </Form>
        </div>
    );
};
