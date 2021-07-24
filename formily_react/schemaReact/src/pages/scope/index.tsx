import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm();

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
    scope: {
        asyncVisible(field) {
            field.loading = true;
            setTimeout(() => {
                field.loading = false;
                form.setFieldState('input', (state) => {
                    //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
                    state.display = field.value;
                });
            }, 1000);
        },
    },
});

export default () => (
    <Form form={form}>
        <SchemaField>
            <SchemaField.String
                name="select"
                title="控制者"
                default="visible"
                enum={[
                    { label: '显示', value: 'visible' },
                    { label: '隐藏', value: 'none' },
                    { label: '隐藏-保留值', value: 'hidden' },
                ]}
                x-component="Select"
                x-decorator="FormItem"
                x-reactions={{
                    //主动联动，但是当value发生变化的时候，触发asyncVisible方法
                    //注意asyncVisible需要先放在scope环境里面，触发方法用run
                    target: 'input',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                        run: 'asyncVisible($self,$target)',
                    },
                }}
            />
            <SchemaField.String
                name="input"
                title="受控者"
                x-component="Input"
                x-decorator="FormItem"
                x-visible={false}
            />
        </SchemaField>
        <FormConsumer>
            {() => (
                <code>
                    <pre>{JSON.stringify(form.values, null, 2)}</pre>
                </code>
            )}
        </FormConsumer>
    </Form>
);
