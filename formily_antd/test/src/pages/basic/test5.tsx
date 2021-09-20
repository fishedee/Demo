import {
    createSchemaField,
    observer,
    FormConsumer,
    Field,
    ObjectField,
    ArrayField,
    mapProps,
    useField,
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

const MyTree: React.FC<any> = observer((props) => {
    const value = props.value;
    const field = useField();

    let onClick = () => {
        value[0]._expand = true;
    };

    return (
        <span>
            <button onClick={onClick}>点我</button>

            <ObjectField name="0">
                <Field
                    name="title"
                    decorator={[FormItem]}
                    component={[Input, {}]}
                />
            </ObjectField>

            {value[0]._expand ? (
                <ObjectField name="0.children.0">
                    <Field
                        name="title"
                        decorator={[FormItem]}
                        component={[Input, {}]}
                    />
                </ObjectField>
            ) : null}
        </span>
    );
});

const SchemaField = createSchemaField({
    components: {
        MyTree,
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
                where: {
                    data: [
                        {
                            title: 'parent 1',
                            children: [
                                {
                                    title: 'parent 1-1',
                                    children: [
                                        {
                                            title: 'sss',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        });
    }, []);
    return (
        <Form form={form} feedbackLayout={'none'}>
            <ObjectField name="where" decorator={[Space]}>
                <ArrayField
                    name="data"
                    title="树形"
                    decorator={[FormItem]}
                    component={[MyTree, {}]}
                />
            </ObjectField>
            <FormConsumer>{(data) => JSON.stringify(data.values)}</FormConsumer>
        </Form>
    );
};

export default Test1;
