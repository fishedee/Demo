import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm();

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
});

export default () => (
    <Form form={form}>
        <SchemaField>
            <SchemaField.String
                name="input"
                title="输入者"
                x-component="Input"
                x-decorator="FormItem"
                x-reactions={[
                    //同时操控多个受控者
                    {
                        //主动受控，target加fulfill，只有当前value为123的时候才会展示input2
                        target: 'input2',
                        fulfill: {
                            state: {
                                value:
                                    "{{'['+($self.value?$self.value:'')+']'}}",
                            },
                        },
                    },
                    {
                        //主动受控，target加fulfill，只有当前value为123的时候才会展示input2
                        target: 'input3',
                        fulfill: {
                            state: {
                                value:
                                    "{{'$'+($self.value?$self.value:'')+'$'}}",
                            },
                        },
                    },
                ]}
            />
            <SchemaField.String
                name="input2"
                title="受控者"
                x-component="Input"
                x-decorator="FormItem"
            />
            <SchemaField.String
                name="input3"
                title="受控者2"
                x-component="Input"
                x-decorator="FormItem"
            />
        </SchemaField>
        <FormConsumer>
            {() => (
                <code>
                    <pre>{JSON.stringify(form.values)}</pre>
                </code>
            )}
        </FormConsumer>
    </Form>
);
