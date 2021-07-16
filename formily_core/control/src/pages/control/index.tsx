import React, { useMemo, useRef } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input } from '@formily/antd';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

//官方DEMO，一行未改，但是跑不起来，不知道为什么
const SchemaField = createSchemaField({
    components: {
        Input,
        FormItem,
    },
});

type Data = {
    input: string;
};

type PropsType = {
    values: Data;
};
const MyForm = (props: PropsType) => {
    const count = useRef(1);
    const form = useMemo(
        () =>
            //注意，是赋值整个value
            createForm({
                values: props.values,
            }),
        [],
    );

    return (
        <Form form={form}>
            <SchemaField>
                <SchemaField.String
                    name="input"
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{ placeholder: '受控者' }}
                />
            </SchemaField>
            Form组件渲染次数：{count.current++}
        </Form>
    );
};

const Controller = observer((props: PropsType) => {
    const count = useRef(1);
    return (
        <FormItem>
            <Input
                value={props.values.input}
                placeholder="控制者"
                onChange={(event) => {
                    props.values.input = event.target.value;
                }}
            />
            Controller组件渲染次数：{count.current++}
        </FormItem>
    );
});

export default () => {
    const count = useRef(1);
    const values = useMemo(() => {
        return observable({
            input: '',
        });
    }, []);
    return (
        <>
            <Controller values={values} />
            <MyForm values={values} />
            根组件渲染次数：{count.current++}
        </>
    );
};
