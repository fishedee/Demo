import React, { ReactChild } from 'react';
import { createForm, Form } from '@formily/core';
import {
    FormProvider,
    Field,
    FormConsumer,
    ObjectField,
    VoidField,
    ArrayField,
} from '@formily/react';
import { Input } from 'antd';
import Card from './Card';
import { FormItem, FormLayout, NumberPicker } from '@formily/antd';
import ArrayItems from './ArrayItems';

const form = createForm({
    effects: () => {},
});

export default () => {
    //使用ArrayField传递描述数组数据，注意不能用props.children来传递
    return (
        <FormProvider form={form}>
            <VoidField
                name="layout"
                component={[FormLayout, { labelCol: 6, wrapperCol: 10 }]}
            >
                <ObjectField
                    name="person"
                    title="个人信息"
                    component={[Card, {}]}
                >
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
                <ArrayField
                    name="contact"
                    title="联系信息"
                    component={[
                        ArrayItems,
                        {
                            childrenRender: (index: number) => {
                                return (
                                    <ObjectField
                                        name={index + ''}
                                        title="信息"
                                        component={[Card, {}]}
                                    >
                                        <Field
                                            name="phone"
                                            title="电话"
                                            required={true}
                                            validator={{ format: 'phone' }}
                                            component={[Input, {}]}
                                            decorator={[FormItem, {}]}
                                        />
                                        <Field
                                            name="email"
                                            title="电子邮件"
                                            required={true}
                                            validator={{ format: 'email' }}
                                            component={[Input, {}]}
                                            decorator={[FormItem, {}]}
                                        />
                                    </ObjectField>
                                );
                            },
                        },
                    ]}
                ></ArrayField>
            </VoidField>
            <FormConsumer>
                {(form: Form) => {
                    return JSON.stringify(form.values) as ReactChild;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
