import React, { ReactChild } from 'react';
import { createForm, Form } from '@formily/core';
import {
    FormProvider,
    Field,
    FormConsumer,
    ObjectField,
    VoidField,
    ArrayField,
    createSchemaField,
    ISchema,
} from '@formily/react';
import { Input } from 'antd';
import Card from './Card';
import { FormItem, FormLayout, NumberPicker } from '@formily/antd';
import ArrayItems from './ArrayItems';

const form = createForm({
    effects: () => {},
});

//创建SchemaField的时候，就已经有options
const SchemaField = createSchemaField({
    components: {
        Input,
        NumberPicker,
        Card,
        FormLayout,
        FormItem,
        ArrayItems,
    },
});

const schema: ISchema = {
    type: 'void',
    'x-component': 'FormLayout',
    'x-component-props': { labelCol: 6, wrapperCol: 10 },
    properties: {
        person: {
            type: 'object',
            title: '个人信息',
            'x-component': 'Card',
            'x-decorator': 'FormItem',
            properties: {
                name: {
                    type: 'string',
                    title: '姓名',
                    required: true,
                    'x-component': 'Input',
                    'x-component-props': {},
                    'x-decorator': 'FormItem',
                },
                age: {
                    type: 'number',
                    title: '年龄',
                    required: true,
                    'x-component': 'NumberPicker',
                    'x-component-props': {},
                    'x-decorator': 'FormItem',
                },
            },
        },
        contact: {
            type: 'array',
            title: '联系信息',
            'x-component': 'ArrayItems',
            'x-decorator': 'FormItem',
            items: {
                type: 'object',
                title: '信息',
                'x-component': 'Card',
                properties: {
                    phone: {
                        type: 'string',
                        title: '电话',
                        format: 'phone',
                        required: true,
                        'x-component': 'Input',
                        'x-component-props': {},
                        'x-decorator': 'FormItem',
                    },
                    email: {
                        type: 'string',
                        title: '电子邮件',
                        format: 'email',
                        required: true,
                        'x-component': 'Input',
                        'x-component-props': {},
                        'x-decorator': 'FormItem',
                    },
                },
            },
        },
    },
};

export default () => {
    //使用schema
    return (
        <FormProvider form={form}>
            <SchemaField schema={schema} />
            <FormConsumer>
                {(form: Form) => {
                    return JSON.stringify(form.values) as ReactChild;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
