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
                name="price"
                title="单价"
                x-component="Input"
                x-decorator="FormItem"
            />
            <SchemaField.String
                name="count"
                title="数量"
                x-component="Input"
                x-decorator="FormItem"
            />
            <SchemaField.String
                name="total"
                title="总额"
                x-editable={false}
                x-component="Input"
                x-decorator="FormItem"
                x-reactions={{
                    //被动受控，dependencies可以是一个数组
                    //注意加入了when操作，当两者的乘积不是合法数值的时候，不进行更新，这个是可选操作
                    dependencies: ['price', 'count'],
                    when: '{{$deps[0] && $deps[1]}}',
                    fulfill: {
                        state: {
                            value: '{{$deps[0]*$deps[1]}}',
                        },
                    },
                }}
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
