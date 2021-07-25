import React from 'react';
import {
    FormItem,
    Input,
    ArrayTable,
    Editable,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import {
    createForm,
    onFieldInputValueChange,
    onFieldValueChange,
} from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';
import { Button, Alert } from 'antd';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Editable,
        Input,
        ArrayTable,
    },
});

const form = createForm({
    effects: () => {
        onFieldInputValueChange('array', (field) => {
            form.setFieldState('array.firstColumn', (state) => {
                let compontProps = state.componentProps;
                if (compontProps) {
                    compontProps.title = 'Sort:' + field.value.length + 'Item';
                }
            });
        });
    },
});

const range = (count: number) =>
    Array.from(new Array(count)).map((_, key) => ({
        aaa: key,
    }));

export default () => {
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Array
                    name="array"
                    x-decorator="FormItem"
                    x-component="ArrayTable"
                    x-component-props={{
                        pagination: { pageSize: 10 },
                        scroll: { x: '100%' },
                    }}
                >
                    <SchemaField.Object>
                        <SchemaField.Void
                            name="firstColumn"
                            //描述每一个行，这个跟ArrayCards的不同。
                            //ArrayCards下面直接就是字段
                            //ArrayTable下面先有列描述，再有字段
                            x-component="ArrayTable.Column"
                            x-component-props={{
                                width: 50,
                                title: 'Sort', //列标题
                                align: 'center', //标题的排列情况
                            }}
                        >
                            <SchemaField.Void
                                x-decorator="FormItem"
                                required
                                x-component="ArrayTable.SortHandle" //内置的操作
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            x-component="ArrayTable.Column"
                            x-component-props={{
                                width: 80,
                                title: 'Index',
                                align: 'center',
                            }}
                        >
                            <SchemaField.String
                                x-decorator="FormItem"
                                required
                                x-component="ArrayTable.Index" //内置的排序
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            x-component="ArrayTable.Column"
                            x-component-props={{
                                title: 'A1',
                                dataIndex: 'a1', //数据位置描述，可省略
                                width: 200, //行宽度，固定的
                            }}
                        >
                            <SchemaField.String
                                name="a1"
                                x-decorator="FormItem" //不是FormItem，是Editable
                                required
                                x-component="Input"
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            x-component="ArrayTable.Column"
                            x-component-props={{
                                title: 'A2', //这里就没有dataIndex的描述
                                width: 200,
                            }}
                        >
                            <SchemaField.String
                                x-decorator="FormItem"
                                name="a2"
                                required
                                x-component="Input"
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            x-component="ArrayTable.Column"
                            x-component-props={{ title: 'A3', width: 200 }}
                        >
                            <SchemaField.String
                                x-decorator="FormItem"
                                name="a3"
                                required
                                x-component="Input"
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            x-component="ArrayTable.Column"
                            x-component-props={{
                                title: 'Operations',
                                dataIndex: 'operations',
                                width: 200,
                                //fixed为right，就是列固定在右边，不动，像fixed布局的一样
                                fixed: 'right',
                            }}
                        >
                            <SchemaField.Void
                                //FormItem也是可以放在Component里面的
                                x-component="FormItem"
                            >
                                <SchemaField.Void x-component="ArrayTable.Remove" />
                                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                                <SchemaField.Void x-component="ArrayTable.MoveUp" />
                            </SchemaField.Void>
                        </SchemaField.Void>
                    </SchemaField.Object>
                    <SchemaField.Void
                        x-component="ArrayTable.Addition"
                        //默认的添加一行操作
                        //method	'push' |'unshift'，可以设置为头部插入，还是尾部插入
                        title="Add entry"
                    />
                </SchemaField.Array>
            </SchemaField>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>Submit</Submit>
                <Button
                    block
                    onClick={() => {
                        //强行初始化数据
                        form.setInitialValues({
                            array: range(100000),
                        });
                    }}
                >
                    Load 10W pieces of large data
                </Button>
            </FormButtonGroup>
            <FormConsumer>
                {(form) => {
                    return <div>{JSON.stringify(form.values)}</div>;
                }}
            </FormConsumer>
            <Alert
                style={{ marginTop: 10 }}
                message="Note: Open the formily plug-in page, because there is data communication in the background, which will occupy the browser's computing power, it is best to test in the incognito mode (no formily plug-in)"
                type="warning"
            />
        </FormProvider>
    );
};
