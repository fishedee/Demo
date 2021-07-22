import React from 'react';
import {
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
    Space,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { Button } from 'antd';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Space,
        Button,
    },
});

const form = createForm();

export default () => {
    let description = `
    Space下的组件都有一定的空隙，默认各个组件的水平存放的
    `;
    return (
        <div style={{ padding: '30px' }}>
            <FormProvider form={form}>
                <pre>{description}</pre>
                <SchemaField>
                    <SchemaField.Void
                        title="name"
                        x-decorator="FormItem"
                        x-decorator-props={{
                            asterisk: true,
                            feedbackLayout: 'none',
                        }}
                        x-component="Space"
                    >
                        <SchemaField.Void
                            name="firstName"
                            x-component="Button"
                            x-component-props={{
                                type: 'primary',
                                children: '按钮1',
                            }}
                            required
                        />
                        <SchemaField.Void
                            name="lastName"
                            x-component="Button"
                            x-component-props={{
                                children: '按钮2',
                            }}
                            required
                        />
                    </SchemaField.Void>
                </SchemaField>
            </FormProvider>
        </div>
    );
};
