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
                x-reactions={
                    //同时操控多个受控者
                    {
                        //使用path的方式，同时指定多个受控者
                        //注意加入了onFieldInputValueChange的操作，仅当输入产生的value变化时才触发，开发者修改的value不触发
                        target: '*(input2,input3)',
                        effects: ['onFieldInputValueChange'],
                        fulfill: {
                            state: {
                                value:
                                    "{{'['+($self.value?$self.value:'')+']'}}",
                            },
                        },
                    }
                }
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
