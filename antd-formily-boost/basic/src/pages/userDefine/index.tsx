import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import {  Table } from 'antd-formily-boost';
import { Form, Input } from '@formily/antd';
import React, { useMemo } from 'react';
import { observable } from '@formily/reactive';

type MyInputType = {
    value: string;
    onChange: (data: any) => void;
};

const MyInput = (props: MyInputType) => {
    return (
        <input
            style={{
                color: 'red',
                background: 'none',
                outline: 'none',
                width: '100%',
                border: '1px solid grey',
            }}
            value={props.value}
            onChange={props.onChange}
        />
    );
};


const SchemaField = createSchemaField({
    components: {
        MyInput,
        Table,
    },
});

let lastState = observable({
  data: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
    },
  ]
});

export default () => {
    console.log('Table Render');
    const form = useMemo(() => {
        return createForm({
            values: lastState,
        });
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="Table"
                    x-component-props={{
                        //加上边框
                        bordered: true,
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            title="Name"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="name"
                                x-component={'MyInput'}
                            />
                        </SchemaField.Void>

                        <SchemaField.Void
                            title="Age"
                            x-component="Table.Column"
                            x-component-props={{
                              labelIndex:'age'
                            }}
                        />
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {() => {
                  console.log(form.values)
                  return <span/>;
                }}
            </FormConsumer>
        </Form>
    );
};