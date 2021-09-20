import {
    createSchemaField,
    observer,
    FormConsumer,
    Field,
    ObjectField,
    ArrayField,
    mapProps,
    RecursionField,
    useFieldSchema,
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
import { useField, Schema } from '@formily/react';

const MyTree: React.FC<any> = observer((props) => {
    const schema = useFieldSchema();
    const itemsSchema: Schema['items'] = schema.items;
    let itemSchema: Schema;
    if (!itemsSchema) {
        throw new Error('schema items is undefined ' + schema);
    }
    if (Array.isArray(itemsSchema)) {
        if (itemsSchema.length == 0) {
            throw new Error('schema items is empty ' + itemsSchema);
        }
        itemSchema = itemsSchema[0];
    } else {
        itemSchema = itemsSchema;
    }

    const value = props.value;

    let onClick = () => {
        value[0]._expand = true;
    };

    return (
        <span>
            <button onClick={onClick}>点我</button>
            <RecursionField schema={itemSchema} name={'0'} />
            {value[0]._expand ? (
                <RecursionField schema={itemSchema} name={'0.children.0'} />
            ) : null}
        </span>
    );
});

const SchemaField = createSchemaField({
    components: {
        MyTree,
        FormItem,
        Input,
    },
});

const Test1: React.FC<any> = (props) => {
    const form = useMemo(() => {
        return createForm({
            values: {
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
        });
    }, []);
    return (
        <Form form={form} feedbackLayout={'none'}>
            <SchemaField>
                <SchemaField.Array name="data" x-component={'MyTree'}>
                    <SchemaField.Object>
                        <SchemaField.String name="title" x-component="Input" />
                    </SchemaField.Object>
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>{(data) => JSON.stringify(data.values)}</FormConsumer>
        </Form>
    );
};

export default Test1;
