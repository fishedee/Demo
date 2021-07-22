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
    Space组件默认设置自身为inline-flex，就是自身为inline组件
    然后设置direction为vertical，那么每个子组件都是垂直摆放的
    `;
    return (
        <div style={{ padding: '30px' }}>
            <Form form={form} feedbackLayout="none">
                <pre>{description}</pre>
                <SchemaField>
                    <SchemaField.Void
                        x-component="Space"
                        x-component-props={{
                            direction: 'vertical',
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
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="Space"
                        x-component-props={{
                            direction: 'vertical',
                        }}
                    >
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
