import { createSchemaField, observer, FormConsumer } from '@formily/react';
import { Button } from 'antd';
import {
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
    Form,
    Space,
} from '@formily/antd';
import { useMemo } from 'react';
import { createForm } from '@formily/core';

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
            <SchemaField>
                <SchemaField.Object name="where" x-component={'Space'}>
                    <SchemaField.String
                        name="name"
                        title="名字"
                        x-decorator="FormItem"
                        x-component="Input"
                        x-component-props={{}}
                    />
                    <SchemaField.String
                        name="name2"
                        title="名字2"
                        x-decorator="FormItem"
                        x-component="Input"
                        x-component-props={{}}
                    />
                </SchemaField.Object>
            </SchemaField>

            <FormConsumer>{(data) => JSON.stringify(data.values)}</FormConsumer>
        </Form>
    );
};

export default Test1;
