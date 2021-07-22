import React from 'react';
import {
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
    Form,
    Space,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { Button } from 'antd';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Space,
        Button,
    },
});

const form = createForm();

export default () => {
    let description = `
    Space组件可以设置环绕的方式存放
    `;
    return (
        <div style={{ padding: '30px' }}>
            <Form form={form} feedbackLayout="none">
                <pre>{description}</pre>
                <SchemaField>
                    <SchemaField.Void
                        x-component="Space"
                        x-component-props={{
                            //size数组代表Space的间隙，8是水平的间距是8px，20是垂直的间距是20px
                            size: [8, 20],
                            //wrap是指元素超出一行放不完的时候，可以环绕的方式放下一行
                            wrap: true,
                        }}
                    >
                        <SchemaField.String
                            name="input1"
                            title="输入框1"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{}}
                            required
                        />
                        <SchemaField.String
                            name="input2"
                            title="输入框2"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{}}
                            required
                        />
                        <SchemaField.String
                            name="input3"
                            title="输入框3"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{}}
                            required
                        />
                        <SchemaField.String
                            name="input4"
                            title="输入框4"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{}}
                            required
                        />
                        <SchemaField.String
                            name="input5"
                            title="输入框5"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{}}
                            required
                        />
                        <SchemaField.String
                            name="input6"
                            title="输入框6"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-component-props={{}}
                            required
                        />
                    </SchemaField.Void>
                </SchemaField>
            </Form>
        </div>
    );
};
