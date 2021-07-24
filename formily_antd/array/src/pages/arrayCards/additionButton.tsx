import React from 'react';
import {
    FormItem,
    Input,
    ArrayCards,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import {
    createForm,
    onFieldInputValueChange,
    onFieldValueChange,
} from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        ArrayCards,
    },
});

const form = createForm({
    effects: () => {
        //effect方式的主动联动
        onFieldValueChange('array.*.input', (field) => {
            //FIXME ArrayCards的实现很傻逼，它拿的是array的title数据，不是array.*的title数据
            //所以以下的代码会导致，一个input的改变所有的title发生改变了
            //每个Object的title标签就是显示数据的
            field.query('..').take().setTitle(field.value);
        });
    },
});

export default () => {
    //maxItems没啥用，就是超出以后会标记红色而已，原来它的想法是限制数量
    //还不如直接用x-reactions来将Addition按钮去掉
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Array
                    name="array"
                    maxItems={3}
                    x-component="ArrayCards"
                    x-component-props={{}}
                >
                    <SchemaField.Object>
                        <SchemaField.String
                            name="input"
                            x-decorator="FormItem"
                            title="输入框"
                            required
                            x-component="Input"
                        />
                        <SchemaField.Void x-component="ArrayCards.Remove" />
                        <SchemaField.Void x-component="ArrayCards.MoveUp" />
                        <SchemaField.Void x-component="ArrayCards.MoveDown" />
                    </SchemaField.Object>
                    <SchemaField.Void
                        x-component="ArrayCards.Addition"
                        x-reactions={{
                            //被动联动
                            dependencies: ['array'],
                            fulfill: {
                                state: {
                                    visible: '{{$deps[0].length<3}}',
                                },
                            },
                        }}
                        title="添加条目"
                    />
                </SchemaField.Array>
            </SchemaField>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>提交</Submit>
            </FormButtonGroup>
            <FormConsumer>
                {(form) => {
                    return <div>{JSON.stringify(form.values)}</div>;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
