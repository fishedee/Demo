import {
    createForm,
    Field,
    onFieldChange,
    onFieldInputValueChange,
} from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { observable } from '@formily/reactive';
import 'antd/dist/antd.compact.css';
import { useState } from 'react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
});

type SelectType = {
    label:string;
    value:number;
}
export default () => {
    let [select,setSelect] = useState<SelectType[]>([{
        label:'啊',
        value:1,
    }]);
    const form = useMemo(() => {
        return createForm({
            values: {},
            effects: () => {
                onFieldInputValueChange('title', (field) => {
                    const field2 = field as Field;
                    console.log('title change to ',field2.value);
                });
            },
        });
    }, []);
    const toggleSelect = ()=>{
        if( select.length == 0 || select.length == 1 ){
            setSelect([{
                label:'你',
                value:2,
            },{
                label:'好',
                value:3,
            }]);
        }else{
            setSelect([{
                label:'啊',
                value:1,
            }]);
        }
    }
    console.log(' currentSelect ',select);
    return (
        <div>
            <Button onClick={toggleSelect}>切换Select</Button>
            <Form form={form} feedbackLayout="terse">
                <SchemaField>
                    <SchemaField.String
                        name="title"
                        enum={select}
                        x-decorator={'FormItem'}
                        x-component={'Select'}
                    />
                </SchemaField>
                <FormConsumer>
                    {() => <div>{JSON.stringify(form.values)}</div>}
                </FormConsumer>
            </Form>
        </div>
    );
};
