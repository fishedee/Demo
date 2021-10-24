import React from 'react';
import { FormItem, Input, Editable, Form } from '@formily/antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { useField, RecursionField, useFieldSchema } from '@formily/react';
import './index.css';

const form = createForm({
    values: {
        array: [
            {
                a1: 'u1',
                a2: 'u2',
            },
            {
                a1: 'k1',
                a2: 'k2',
            },
        ],
    },
});

const MyArrayField: React.FC<any> = observer((props) => {
    const field = useField();
    const schema = useFieldSchema();
    return (
        <div className="my-table">
            {field.value?.map((single, i) => {
                return (
                    <div>
                        <RecursionField schema={schema.items} name={i} />
                    </div>
                );
            })}
        </div>
    );
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Editable,
        Input,
        MyArrayField,
    },
});

export default () => {
    return (
        <Form form={form} feedbackLayout="loose">
            <SchemaField>
                <SchemaField.Array name="array" x-component="MyArrayField">
                    <SchemaField.Object>
                        <SchemaField.String
                            name="a1"
                            x-decorator="FormItem"
                            required
                            x-component="Input"
                            x-decorator-props={{
                                style: {
                                    display: 'inline-block',
                                    width: '40%',
                                },
                            }}
                        />
                        <SchemaField.String
                            x-decorator="FormItem"
                            name="a2"
                            required
                            x-component="Input"
                            x-decorator-props={{
                                style: {
                                    display: 'inline-block',
                                    width: '40%',
                                },
                            }}
                        />
                    </SchemaField.Object>
                </SchemaField.Array>
            </SchemaField>
        </Form>
    );
};
