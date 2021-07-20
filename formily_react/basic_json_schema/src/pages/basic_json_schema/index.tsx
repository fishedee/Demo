import { autorun, observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { FormConsumer, FormProvider } from './Context';
import Input from './Input';
import InputDigit from './InputDigit';
import Password from './Password';
import Label from './Label';
import FormItem from './FormItem';
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import Card from './Card';
import ArrayItems from './ArrayItemsSchema';
import { Schema, SchemaOptions } from './Schema';
import { JsonSchema } from './JsonSchema';

let options: SchemaOptions = {
    Input: Input,
    InputDigit: InputDigit,
    Password: Password,
    Label: Label,
    Card: Card,
    ArrayItems: ArrayItems,
    FormItem: FormItem,
};

let schema: JsonSchema = {
    type: 'object',
    'x-component': 'FormItem',
    'x-component-props': {},
    'x-decorator': 'FormItem',
    'x-decorator-props': {},
    properties: {
        person: {
            type: 'object',
            name: 'person',
            title: '个人信息',
            'x-component': 'Card',
            'x-component-props': {},
            'x-decorator': 'FormItem',
            'x-decorator-props': {},
            properties: {
                name: {
                    type: 'string',
                    name: 'name',
                    title: '名称',
                    required: true,
                    'x-component': 'Input',
                    'x-component-props': {},
                    'x-decorator': 'FormItem',
                    'x-decorator-props': {},
                },
                age: {
                    type: 'number',
                    name: 'age',
                    title: '年龄',
                    required: true,
                    'x-component': 'InputDigit',
                    'x-component-props': {},
                    'x-decorator': 'FormItem',
                    'x-decorator-props': {},
                },
            },
        },
        contact: {
            type: 'array',
            name: 'contact',
            title: '联系信息',
            'x-component': 'ArrayItems',
            'x-component-props': {},
            'x-decorator': 'FormItem',
            'x-decorator-props': {},
            items: {
                type: 'object',
                title: '信息',
                'x-component': 'Card',
                'x-component-props': {},
                'x-decorator': 'FormItem',
                'x-decorator-props': {},
                properties: {
                    name: {
                        type: 'string',
                        name: 'phone',
                        title: '电话',
                        required: true,
                        format: 'phone',
                        'x-component': 'Input',
                        'x-component-props': {},
                        'x-decorator': 'FormItem',
                        'x-decorator-props': {},
                    },
                    age: {
                        type: 'string',
                        name: 'email',
                        title: '电子邮件',
                        required: true,
                        format: 'email',
                        'x-component': 'Input',
                        'x-component-props': {},
                        'x-decorator': 'FormItem',
                        'x-decorator-props': {},
                    },
                },
            },
            properties: {},
        },
    },
};

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {},
        });
    }, []);

    return (
        <FormProvider form={form}>
            <Schema options={options} schema={schema} />
            <FormConsumer>
                {(form) => {
                    return <div>{JSON.stringify(form.values)}</div>;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
