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
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Space,
    },
});

const form = createForm();

export default () => {
    let description = `
    Space其实就是一个包围组件，它默认就是flex布局，可以控制包围组件下各个元素的间隙
    * 而Space组件一般用FormItem组件组合一起使用。本来FormItem自身就有feedbackLayout的空隙，再加上Input组件的FormItem也有feedbackLayout的空隙，这样就会产生双重空隙
    因此，总是要将Space组件的FormItem的空隙设置为空
    * 另外一方面，每个Input都属于FormItem，来显示校验错误时的错误描述，所以，Input下的FormItem是不能省略的。
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
                        <SchemaField.String
                            name="firstName"
                            x-decorator="FormItem"
                            x-component="Input"
                            required
                        />
                        <SchemaField.String
                            name="lastName"
                            x-decorator="FormItem"
                            x-component="Input"
                            required
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        title="Text concatenation"
                        x-decorator="FormItem"
                        x-decorator-props={{
                            asterisk: true,
                            feedbackLayout: 'none',
                        }}
                        x-component="Space"
                    >
                        <SchemaField.String
                            name="aa"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-decorator-props={{
                                addonAfter: 'Unit',
                            }}
                            required
                        />
                        <SchemaField.String
                            name="bb"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-decorator-props={{
                                addonAfter: 'Unit',
                            }}
                            required
                        />
                        <SchemaField.String
                            name="cc"
                            x-decorator="FormItem"
                            x-component="Input"
                            x-decorator-props={{
                                addonAfter: 'Unit',
                            }}
                            required
                        />
                    </SchemaField.Void>
                </SchemaField>
                <FormButtonGroup>
                    <Submit onSubmit={console.log}>提交</Submit>
                </FormButtonGroup>
            </FormProvider>
        </div>
    );
};
