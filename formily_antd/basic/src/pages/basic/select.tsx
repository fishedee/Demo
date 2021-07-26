import React from 'react';
import {
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
    TreeSelect,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Select,
        TreeSelect,
        FormItem,
    },
});

const form = createForm();

export default () => (
    <FormProvider form={form}>
        <SchemaField>
            <SchemaField.Number
                name="input"
                title="select box"
                x-decorator="FormItem"
                x-component="Select"
                enum={[
                    { label: 'Option 1', value: 1 },
                    { label: 'Option 2', value: 2 },
                ]}
                x-component-props={{
                    style: {
                        width: 120,
                    },
                }}
            />
            <SchemaField.Number
                name="input2"
                title="select box"
                x-decorator="FormItem"
                x-component="TreeSelect"
                enum={[
                    {
                        label: 'Option 1',
                        value: 1,
                        children: [
                            {
                                title: 'Child Node1',
                                value: '0-0-0',
                                key: '0-0-0',
                            },
                            {
                                title: 'Child Node2',
                                value: '0-0-1',
                                key: '0-0-1',
                            },
                            {
                                title: 'Child Node3',
                                value: '0-0-2',
                                key: '0-0-2',
                            },
                        ],
                    },
                    {
                        label: 'Option 2',
                        value: 2,
                        children: [
                            {
                                title: 'Child Node3',
                                value: '0-1-0',
                                key: '0-1-0',
                            },
                            {
                                title: 'Child Node4',
                                value: '0-1-1',
                                key: '0-1-1',
                            },
                            {
                                title: 'Child Node5',
                                value: '0-1-2',
                                key: '0-1-2',
                            },
                        ],
                    },
                ]}
                x-component-props={{
                    style: {
                        width: 200,
                    },
                }}
            />
        </SchemaField>
        <FormButtonGroup>
            <Submit onSubmit={console.log}>Submit</Submit>
        </FormButtonGroup>
        <FormConsumer>
            {(form) => {
                return <div>{JSON.stringify(form.values)}</div>;
            }}
        </FormConsumer>
    </FormProvider>
);
