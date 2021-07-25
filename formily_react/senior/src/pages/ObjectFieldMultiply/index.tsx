import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
    effects: () => {},
});

const form2 = createForm({
    effects: () => {},
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
});

export default () => {
    //同一级的SchemaField不能有两个相同的name，否则因为properties相同而撞在一起了
    //可以用Void来包围一下放在下一级使用两个相同的name
    return (
        <div>
            <Form form={form}>
                <SchemaField>
                    <SchemaField.Object name="object">
                        <SchemaField.String
                            name="input"
                            title="Object输入框"
                            x-component="Input"
                            x-decorator="FormItem"
                        />
                    </SchemaField.Object>
                    <SchemaField.Object name="object">
                        <SchemaField.String
                            name="input2"
                            title="Object输入框"
                            x-component="Input"
                            x-decorator="FormItem"
                        />
                    </SchemaField.Object>
                </SchemaField>
                <FormConsumer>
                    {() => (
                        <code>
                            <pre>{JSON.stringify(form.values)}</pre>
                        </code>
                    )}
                </FormConsumer>
            </Form>
            <Form form={form2}>
                <SchemaField>
                    <SchemaField.Object name="object">
                        <SchemaField.String
                            name="input"
                            title="Object输入框"
                            x-component="Input"
                            x-decorator="FormItem"
                        />
                    </SchemaField.Object>
                    <SchemaField.Void name="void">
                        <SchemaField.Object name="object">
                            <SchemaField.String
                                name="input2"
                                title="Object输入框"
                                x-component="Input"
                                x-decorator="FormItem"
                            />
                        </SchemaField.Object>
                    </SchemaField.Void>
                </SchemaField>
                <FormConsumer>
                    {() => (
                        <code>
                            <pre>{JSON.stringify(form2.values)}</pre>
                        </code>
                    )}
                </FormConsumer>
            </Form>
        </div>
    );
};
