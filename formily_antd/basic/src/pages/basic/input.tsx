import React from 'react';
import {
    Input,
    FormItem,
    FormButtonGroup,
    Submit,
    NumberPicker,
    Password,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        FormItem,
        NumberPicker,
        Password,
    },
});

const form = createForm();

export default () => (
    <FormProvider form={form}>
        <SchemaField>
            <SchemaField.String
                name="input"
                title="input box"
                x-decorator="FormItem"
                x-component="Input"
                required
                x-component-props={{
                    style: {
                        width: 240,
                    },
                }}
            />
            <SchemaField.String
                name="input2"
                title="text box"
                x-decorator="FormItem"
                required
                x-component="Input.TextArea"
                x-component-props={{
                    style: {
                        width: 400,
                    },
                }}
            />
            <SchemaField.String
                name="input3"
                title="input box"
                x-decorator="FormItem"
                x-component="NumberPicker"
                required
                x-component-props={{
                    style: {
                        width: 240,
                    },
                }}
            />
            <SchemaField.String
                name="input4"
                title="input box"
                x-decorator="FormItem"
                x-component="Password"
                required
                x-component-props={{
                    checkStrength: true,
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
