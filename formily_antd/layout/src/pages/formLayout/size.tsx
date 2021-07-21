import React from 'react';
import { Input, Select, FormItem, FormLayout } from '@formily/antd';
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
    FormLayout是用来控制所有FormItem的默认样式的
    size有large,small,default
    `;
    return (
        <FormProvider form={form}>
            <pre>{description}</pre>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormLayout"
                    x-component-props={{
                        size: 'small',
                    }}
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
        </FormProvider>
    );
};
