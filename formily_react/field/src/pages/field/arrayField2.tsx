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

const form = createForm({
    effects: () => {},
});

export default () => {
    //使用ArrayField传递描述数组数据，component为空的时候，formily会调用props.children（函数类型）来渲染页面，很少这样用
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
                    decorator={[FormItem, {}]}
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
                    title="联系信息"
                    name="contact"
                    decorator={[FormItem, {}]}
                >
                    {(field) => {
                        return (
                            <div
                                style={{
                                    border: '2px solid rgb(186 203 255)',
                                }}
                            >
                                <div style={{ padding: '10px' }}>
                                    {field.value?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div>
                                                    <ObjectField
                                                        name={index + ''}
                                                        title="信息"
                                                        component={[Card, {}]}
                                                    >
                                                        <Field
                                                            name="phone"
                                                            title="电话"
                                                            required={true}
                                                            validator={{
                                                                format: 'phone',
                                                            }}
                                                            component={[
                                                                Input,
                                                                {},
                                                            ]}
                                                            decorator={[
                                                                FormItem,
                                                                {},
                                                            ]}
                                                        />
                                                        <Field
                                                            name="email"
                                                            title="电子邮件"
                                                            required={true}
                                                            validator={{
                                                                format: 'email',
                                                            }}
                                                            component={[
                                                                Input,
                                                                {},
                                                            ]}
                                                            decorator={[
                                                                FormItem,
                                                                {},
                                                            ]}
                                                        />
                                                    </ObjectField>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        field.remove(index);
                                                    }}
                                                >
                                                    删除
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => {
                                        field.push({});
                                    }}
                                >
                                    添加一行
                                </button>
                            </div>
                        );
                    }}
                </ArrayField>
            </VoidField>
            <FormConsumer>
                {(form: Form) => {
                    return JSON.stringify(form.values) as ReactChild;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
