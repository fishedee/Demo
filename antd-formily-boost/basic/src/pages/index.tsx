import { createForm, onFieldReact } from '@formily/core';
import { createSchemaField, FormConsumer, Schema } from '@formily/react';
import { Label, Table, Link, SpaceDivider } from 'antd-formily-boost';
import { Form, FormItem, Input, Select, Space } from '@formily/antd';
import React, { useMemo } from 'react';
import { observable } from '@formily/reactive';
import { PaginationType } from 'antd-formily-boost/Table';
import 'antd/dist/antd.compact.css';


const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
        Label,
        Link,
        SpaceDivider,
    },
});

type DataType = {
    name: string;
    age: number;
};
let lastState: { data: DataType[]; pagniaction: PaginationType } = observable({
    data: [],
    pagniaction: {
        current: 0,
        pageSize: 10,
    },
});

for (var i = 0; i != 100; i++) {
    lastState.data.push({
        name: 'fish_' + i,
        age: i,
    });
}

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
        });
    }, []);
    return (
      <Space direction="vertical" style={{padding:'50px',background:'grep',display:'flex'}}>
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="Table"
                    x-component-props={{
                        bordered: true,
                        paginaction: lastState.pagniaction,
                        paginationProps: {
                            defaultPageSize: 10,
                            showQuickJumper: true,
                            showTotal: true,
                        },
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            x-component="Table.RadioColumn"
                            x-component-props={{
                                dataIndex: '_checked',
                                selectRowByClick: true,
                            }}
                        />
                        <SchemaField.Void
                            title="名字"
                            x-component="Table.Column"
                            x-component-props={{
                                width: '30%',
                            }}
                        >
                            <SchemaField.String
                                name="name"
                                x-component={'Label'}
                            />
                        </SchemaField.Void>

                        <SchemaField.Void
                            title="年龄"
                            x-component="Table.Column"
                            x-component-props={{
                                width: '70%',
                            }}
                        >
                            <SchemaField.String
                                name="age"
                                x-component={'Label'}
                            />
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {(form)=>{
                    return <span>{JSON.stringify(form.values)}</span>
                }}
            </FormConsumer>
        </Form>
    </Space>
    );
};