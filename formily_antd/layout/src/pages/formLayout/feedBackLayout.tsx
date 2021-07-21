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
    feedbackLayout就是校验失败时，怎样提示：
    * loose，默认值，UI默认留有失败文案的位置
    * terse，UI默认没有失败文案的位置，失败的时候再腾出位置
    * popover，文案提示是弹出方式的
    * none，没有文案提示
    `;
    return (
        <FormProvider form={form}>
            <pre>{description}</pre>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormLayout"
                    x-component-props={{
                        feedbackLayout: 'terse',
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
