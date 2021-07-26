import React from 'react';
import {
    TimePicker,
    FormItem,
    FormButtonGroup,
    Submit,
    DatePicker,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        TimePicker,
        FormItem,
        DatePicker,
    },
});

const form = createForm();

export default () => (
    <FormProvider form={form}>
        <SchemaField>
            <SchemaField.String
                name="input1"
                title="time"
                required
                x-decorator="FormItem"
                x-component="TimePicker"
            />
            <SchemaField.String
                name="[input2,input3]"
                title="time range"
                x-decorator="FormItem"
                x-component="TimePicker.RangePicker"
            />
            <SchemaField.String
                name="input4"
                required
                title="normal date"
                x-decorator="FormItem"
                x-component="DatePicker"
            />
            <SchemaField.String
                name="input5"
                title="Week Selection"
                x-decorator="FormItem"
                x-component="DatePicker"
                x-component-props={{
                    picker: 'week',
                }}
            />
            <SchemaField.String
                name="[input6,input7]"
                required
                title="normal date"
                x-decorator="FormItem"
                x-component="DatePicker.RangePicker"
            />
            <SchemaField.String
                name="[input7,input8]"
                title="Week Selection"
                x-decorator="FormItem"
                x-component="DatePicker.RangePicker"
                x-component-props={{
                    picker: 'week',
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
