import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import {  Table } from 'antd-formily-boost';
import { Form, Input ,Space} from '@formily/antd';
import React, { useMemo } from 'react';
import { observable } from '@formily/reactive';
import {Button} from 'antd';

const SchemaField = createSchemaField({
    components: {
        Input,
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
    const onClick = () => {
        const columnField = form.query('data.firstColumn').take();
        if (!columnField) {
            return;
        }
        columnField.visible = !columnField.visible;
    };
    return (
    <Space direction="vertical" size={10} style={{ display: 'flex' }}>
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
                            name="firstColumn"
                            title="Name"
                            x-component="Table.Column"
                            x-component-props={{}}
                        >
                            <SchemaField.String
                                name="name"
                                x-component={'Input'}
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
        <Space direction={'horizontal'}>
            <Button onClick={onClick} type="primary">
                Toggle第一列
            </Button>
        </Space>
    </Space>
    );
};