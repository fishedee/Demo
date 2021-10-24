import {
    createForm,
    Field,
    onFieldChange,
    onFieldValueChange,
} from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import Tree from './MyTree2';
import { Form, FormItem, Input, Select } from '@formily/antd';
import React, { useMemo } from 'react';
import { observable } from '@formily/reactive';
import 'antd/dist/antd.compact.css';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Tree,
    },
});

let lastState = {
    data: [
        {
            title: 'parent 1',
            children: [
                {
                    title: 'parent 1-1',
                    children: [
                        {
                            title: 'sss',
                        },
                    ],
                },
            ],
        },
    ],
};

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
            effects: () => {
                onFieldChange('data', (field) => {
                    const field2 = field as Field;
                    console.log('my', JSON.stringify(field2.value));
                });
            },
        });
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="Tree"
                    x-component-props={{}}
                >
                    <SchemaField.Object>
                        <SchemaField.String
                            name="title"
                            x-component={'Input'}
                        />
                    </SchemaField.Object>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {() => <div>{JSON.stringify(form.values)}</div>}
            </FormConsumer>
        </Form>
    );
};
