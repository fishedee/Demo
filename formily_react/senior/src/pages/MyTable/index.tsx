import { createForm, onFieldInputValueChange } from '@formily/core';
import {
    createSchemaField,
    Field,
    FormConsumer,
    ObjectField,
} from '@formily/react';
import MyTable from './MyTable';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
    effects: () => {
        onFieldInputValueChange('data', (field) => {
            form.setFieldState('data.firstColumn', (state) => {
                let compontProps = state.componentProps;
                if (compontProps) {
                    console.log('change title');
                    compontProps.name = '名字:' + field.value.length + '行';
                }
            });
        });
    },
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        MyTable,
    },
});

export default () => {
    //MyTable实现了自增，但是Column组件并没有支持effects
    return (
        <div>
            <Form form={form} feedbackLayout="terse">
                <SchemaField>
                    <SchemaField.Array name="data" x-component="MyTable">
                        <SchemaField.Void>
                            <SchemaField.Void
                                name="firstColumn"
                                x-component="MyTable.Column"
                                x-component-props={{
                                    title: '名字',
                                    style: {
                                        width: '100px',
                                    },
                                }}
                            >
                                <SchemaField.String
                                    name="name"
                                    x-component="Input"
                                    x-decorator="FormItem"
                                />
                            </SchemaField.Void>

                            <SchemaField.Void
                                x-component="MyTable.Column"
                                x-component-props={{
                                    title: '年龄',
                                }}
                            >
                                <SchemaField.String
                                    name="age"
                                    x-component="Input"
                                    x-decorator="FormItem"
                                />
                            </SchemaField.Void>
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
