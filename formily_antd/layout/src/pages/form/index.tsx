import React from 'react';
import { Input, Select, FormItem, FormLayout, Form } from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        FormLayout,
    },
});

const form = createForm();

export default () => {
    let description = `
    Form其实是FormProvider，与FormLayout的组合
    并且提供了onAutoSubmit的方法
    `;
    return (
        <Form form={form} layout={'vertical'} onAutoSubmit={console.log}>
            <pre>{description}</pre>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormLayout"
                    x-component-props={{}}
                >
                    <SchemaField.String
                        name="input"
                        title="输入"
                        x-decorator="FormItem"
                        x-decorator-props={{}}
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="select"
                        title="选择框"
                        x-decorator="FormItem"
                        x-component="Select"
                        required
                    />
                </SchemaField.Void>
            </SchemaField>
        </Form>
    );
};
