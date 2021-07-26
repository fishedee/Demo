import React from 'react';
import {
    Checkbox,
    FormItem,
    FormButtonGroup,
    Submit,
    Radio,
    Switch,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Checkbox,
        Radio,
        FormItem,
        Switch,
    },
});

const form = createForm();

export default () => {
    //注意CheckBox与CheckBox.Group的区别，可选的数值写入enum

    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Boolean
                    name="input"
                    title="Are you sure"
                    x-decorator="FormItem"
                    x-component="Checkbox"
                />
                <SchemaField.Number
                    name="input1_2"
                    title="Switch"
                    x-decorator="FormItem"
                    x-component="Switch"
                />
                <SchemaField.String
                    name="input2"
                    title="Check"
                    enum={[
                        {
                            label: 'Option 1',
                            value: 1,
                        },
                        {
                            label: 'Option 2',
                            value: 2,
                        },
                    ]}
                    x-decorator="FormItem"
                    x-component="Checkbox.Group"
                />
                <SchemaField.Number
                    name="input3"
                    title="single choice"
                    enum={[
                        {
                            label: 'Option 1',
                            value: 1,
                        },
                        {
                            label: 'Option 2',
                            value: 2,
                        },
                    ]}
                    x-decorator="FormItem"
                    x-component="Radio.Group"
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
};
