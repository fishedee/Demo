import { createForm } from '@formily/core';
import {
    createSchemaField,
    Field,
    FormConsumer,
    ObjectField,
} from '@formily/react';
import ArrayList from './ArrayList';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
    effects: () => {},
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        ArrayList,
    },
});

export default () => {
    return (
        <div>
            <Form form={form}>
                <SchemaField>
                    <SchemaField.Array name="data" x-component="ArrayList">
                        <SchemaField.Void>
                            <SchemaField.String
                                name="input"
                                title="输入框A"
                                x-component="Input"
                                x-decorator="FormItem"
                            />
                            <SchemaField.String
                                name="input2"
                                title="输入框B"
                                x-component="Input"
                                x-decorator="FormItem"
                            />
                        </SchemaField.Void>
                    </SchemaField.Array>
                </SchemaField>
                <FormConsumer>
                    {() => (
                        <code>
                            <pre>{JSON.stringify(form.values)}</pre>
                        </code>
                    )}
                </FormConsumer>
            </Form>
        </div>
    );
};
