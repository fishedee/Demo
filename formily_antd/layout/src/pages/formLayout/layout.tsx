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
    layout有vertical，horizontal，和inline
    inline会紧紧地放在一起
    layout是指label与wrapper的排版
    `;
    return (
        <FormProvider form={form}>
            <pre>{description}</pre>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormLayout"
                    x-component-props={{
                        layout: 'vertical',
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
