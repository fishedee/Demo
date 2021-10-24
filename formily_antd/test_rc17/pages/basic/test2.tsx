import {
    createSchemaField,
    observer,
    FormConsumer,
    Field,
    ObjectField,
    mapProps,
} from '@formily/react';
import { Button } from 'antd';
import {
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
    Form,
} from '@formily/antd';
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { Space } from 'antd';

const SchemaField = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Space,
        Button,
        Submit,
    },
});

const Wrapper: React.FC<any> = (props) => {
    return <span>{props.children}</span>;
};
const Test1: React.FC<any> = (props) => {
    const form = useMemo(() => {
        return createForm({
            values: {
                where: {},
            },
        });
    }, []);
    return (
        <Form form={form} feedbackLayout={'none'}>
            <ObjectField name="where" component={[Space]}>
                <Field
                    name="name"
                    title="名字"
                    decorator={[FormItem]}
                    component={[Input, {}]}
                />
            </ObjectField>
            <FormConsumer>{(data) => JSON.stringify(data.values)}</FormConsumer>
        </Form>
    );
};

export default Test1;
