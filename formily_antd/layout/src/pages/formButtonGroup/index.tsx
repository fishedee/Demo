import React from 'react';
import {
    FormButtonGroup,
    Submit,
    Reset,
    FormItem,
    Input,
    FormLayout,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
    },
});

const form = createForm();

export default () => {
    //FormButtonGroup.FormItem能够用来对齐FormLayout，与其他字段的wrapperCol对齐。它其实就是个空Label的FormItem而已
    //Sticky可以做到长表单的时候，底部的按钮群像fixed一样保持不动，不会因为上下滚动而变动位置。搭配FormButtonGroup可以设置好是在left,right还是center
    return (
        <FormProvider form={form}>
            <FormLayout labelCol={6} wrapperCol={10}>
                <SchemaField>
                    <SchemaField.String
                        title="输入框"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                    />
                    <SchemaField.String
                        title="输入框"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                    />
                    <SchemaField.String
                        title="输入框"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                    />
                </SchemaField>
                <FormButtonGroup.FormItem>
                    <Submit onSubmit={console.log}>提交</Submit>
                    <Reset>重置</Reset>
                </FormButtonGroup.FormItem>
            </FormLayout>
            <FormLayout labelCol={6} wrapperCol={10}>
                <SchemaField>
                    <SchemaField.String
                        title="输入框"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                    />
                    <SchemaField.String
                        title="输入框"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                    />
                    <SchemaField.String
                        title="输入框"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                    />
                </SchemaField>
                <FormButtonGroup.Sticky align="center">
                    <FormButtonGroup gutter={10}>
                        <Submit onSubmit={console.log}>提交</Submit>
                        <Reset>重置</Reset>
                    </FormButtonGroup>
                </FormButtonGroup.Sticky>
            </FormLayout>
        </FormProvider>
    );
};
