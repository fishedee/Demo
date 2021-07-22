import React from 'react';
import {
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
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
    FormLayout是用来控制所有FormItem的默认样式的
    那么FormItem就是单独的FormItem的独立样式的
    `;
    return (
        <div style={{ padding: '30px' }}>
            <FormProvider form={form}>
                <pre>{description}</pre>
                <SchemaField>
                    <SchemaField.String
                        name="input"
                        title="输入框"
                        x-decorator="FormItem"
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="input2" //空label，title设置为空
                        x-decorator="FormItem"
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="input3" //没有冒号，用colon
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ colon: false }}
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="input4" //问号的提示信息，用tooltip
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ tooltip: <div>123</div> }}
                        x-component="Input"
                        required
                    />
                    <SchemaField.String
                        name="input4_prefix" //前缀，用addonBefore
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ addonBefore: <div>prefix</div> }}
                        x-component="Input"
                    />
                    <SchemaField.String
                        name="inpt4_suffix" //后缀，用addonAfter
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ addonAfter: <div>suffix</div> }}
                        x-component="Input"
                    />
                    <SchemaField.String
                        name="input5" //没有required，但是需要用*号，用asterisk
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ asterisk: true }}
                        x-component="Input"
                    />
                    <SchemaField.String
                        name="input6" //额外描述，用extra
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ extra: '额外描述' }}
                        x-component="Input"
                    />
                    <SchemaField.String
                        name="input7" //无边框，用bordered
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ bordered: false }}
                        x-component="Input"
                    />
                    <SchemaField.String
                        name="input8" //全包围边框，用inset
                        title="输入框"
                        x-decorator="FormItem"
                        x-decorator-props={{ inset: true }}
                        x-component="Input"
                    />
                </SchemaField>
                <FormButtonGroup>
                    <Submit onSubmit={console.log}>提交</Submit>
                </FormButtonGroup>
            </FormProvider>
        </div>
    );
};
