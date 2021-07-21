import React, { ReactChild } from 'react';
import { createForm, Form } from '@formily/core';
import { FormProvider, Field, FormConsumer } from '@formily/react';
import { Input } from 'antd';

const form = createForm({
    effects: () => {},
});

export default () => {
    return (
        <FormProvider form={form}>
            <Field
                name="input"
                component={[Input, { placeholder: 'Please Input' }]}
            />
            <FormConsumer>
                {(form: Form) => {
                    return JSON.stringify(form.values) as ReactChild;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
