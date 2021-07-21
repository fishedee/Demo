import React, { ReactChild } from 'react';
import { createForm, Form } from '@formily/core';
import {
    FormProvider,
    Field,
    FormConsumer,
    ObjectField,
    VoidField,
} from '@formily/react';
import { Input } from 'antd';
import Card from './Card';
import { FormItem, NumberPicker } from '@formily/antd';

const form = createForm({
    effects: () => {},
});

export default () => {
    return (
        <FormProvider form={form}>
            <ObjectField name="person" title="个人信息" component={[Card, {}]}>
                <Field
                    name="name"
                    title="姓名"
                    required={true}
                    component={[Input, {}]}
                    decorator={[FormItem, {}]}
                />
                <Field
                    name="age"
                    title="年龄"
                    required={true}
                    component={[NumberPicker, {}]}
                    decorator={[FormItem, {}]}
                />
            </ObjectField>
            <FormConsumer>
                {(form: Form) => {
                    return JSON.stringify(form.values) as ReactChild;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
