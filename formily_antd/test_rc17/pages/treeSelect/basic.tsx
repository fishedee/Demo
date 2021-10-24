import React from 'react';
import TreeSelect from './tree';
import { Input } from '@formily/antd';
import { FormItem, FormButtonGroup, Submit } from '@formily/antd';
import {
    createForm,
    Field,
    onFieldInputValueChange,
    onFieldReact,
} from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        TreeSelect,
        FormItem,
        Input,
    },
});

const form = createForm({
    effects: () => {
        onFieldReact('result', (field) => {
            const field2 = field as Field;
            const selectValue = field.query('.select').value();
            console.log('value', selectValue);
            field2.setValue(selectValue);
        });
    },
});

export default () => (
    <FormProvider form={form}>
        <SchemaField>
            <SchemaField.Number
                name="select"
                title="选择框"
                x-decorator="FormItem"
                x-component="TreeSelect"
                enum={[
                    {
                        label: '选项1',
                        value: '0-0',
                        children: [
                            {
                                label: 'Child Node1',
                                value: '0-0-0',
                            },
                            {
                                label: 'Child Node2',
                                value: '0-0-1',
                            },
                            {
                                label: 'Child Node3',
                                value: '0-0-2',
                            },
                        ],
                    },
                    {
                        label: '选项2',
                        value: '0-1',
                        children: [
                            {
                                label: 'Child Node3',
                                value: '0-1-0',
                            },
                            {
                                label: 'Child Node4',
                                value: '0-1-1',
                            },
                            {
                                label: 'Child Node5',
                                value: '0-1-2',
                            },
                        ],
                    },
                ]}
                x-component-props={{
                    style: {
                        width: 200,
                    },
                    defaultExpandAll: true,
                }}
            />
            <SchemaField.String
                name="result"
                title="结果"
                x-decorator={'FormItem'}
                x-component="Input"
            />
        </SchemaField>
    </FormProvider>
);
