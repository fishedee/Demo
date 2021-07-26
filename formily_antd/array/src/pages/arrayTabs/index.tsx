import React from 'react';
import {
    FormItem,
    Input,
    ArrayTabs,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        ArrayTabs,
    },
});

const form = createForm();

export default () => {
    //跟arrayCards相似的实现，+号是默认组件，无法去掉，触发+号标签的时候就会新建一个标签
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Array
                    name="array"
                    x-decorator="FormItem"
                    title="对象数组"
                    maxItems={3}
                    x-component="ArrayTabs"
                >
                    <SchemaField.Object>
                        <SchemaField.String
                            x-decorator="FormItem"
                            title="AAA"
                            name="aaa"
                            required
                            x-component="Input"
                        />
                        <SchemaField.String
                            x-decorator="FormItem"
                            title="BBB"
                            name="bbb"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Object>
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
