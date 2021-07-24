import React from 'react';
import {
    FormItem,
    Input,
    ArrayCards,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import { createForm, onFieldInputValueChange } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        ArrayCards,
    },
});

const form = createForm({
    effects: () => {
        /*
        //effect方式的主动联动
        onFieldInputValueChange('array.*.input', (field) => {
            field.query('..').take().setTitle(field.value);
        });
        */
    },
});

export default () => {
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Array
                    name="array"
                    x-component="ArrayCards"
                    x-component-props={{}}
                >
                    <SchemaField.Object
                        //path表达式取出子级的数据
                        x-reactions={{
                            dependencies: ['.[].input'],
                            fulfill: {
                                state: {
                                    visible: "{{$deps[0]!='123'}}",
                                },
                            },
                        }}
                    >
                        <SchemaField.String
                            name="title"
                            x-decorator="FormItem"
                            title="标题"
                            x-component="Input"
                        />
                        <SchemaField.String
                            name="input"
                            x-decorator="FormItem"
                            title="输入框"
                            required
                            x-component="Input"
                        />
                        <SchemaField.Void x-component="ArrayCards.Remove" />
                        <SchemaField.Void x-component="ArrayCards.MoveUp" />
                        <SchemaField.Void x-component="ArrayCards.MoveDown" />
                    </SchemaField.Object>
                    <SchemaField.Void
                        x-component="ArrayCards.Addition"
                        x-reactions={{
                            //被动联动
                            dependencies: ['array'],
                            fulfill: {
                                state: {
                                    visible: '{{$deps[0].length<3}}',
                                },
                            },
                        }}
                        title="添加条目"
                    />
                </SchemaField.Array>
            </SchemaField>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>提交</Submit>
            </FormButtonGroup>
            <FormConsumer>
                {(form) => {
                    return <div>{JSON.stringify(form.values)}</div>;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
