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
import { Space, Tree } from 'antd';
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
        <Tree
            style={{ width: '100px' }}
            treeData={value}
            titleRender={(node) => {
                return <RecursionField schema={itemSchema} name={node.key} />;
            }}
        />
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
                        key: '0',
                        children: [
                            {
                                title: 'parent 1-1',
                                key: '0.children.0',
                                children: [
                                    {
                                        title: 'sss',
                                        key: '0.children.0.children.0',
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
