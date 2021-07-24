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
            />
            <SchemaField.String
                name="input2"
                title="受控者"
                x-component="Input"
                x-decorator="FormItem"
                x-reactions={{
                    //被动受控，dependencies加fulfill
                    dependencies: ['input'],
                    fulfill: {
                        state: {
                            value: '{{$deps[0]}}',
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
