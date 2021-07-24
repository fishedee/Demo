import React from 'react';
import {
    FormCollapse,
    FormLayout,
    FormItem,
    Input,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';
import { Button } from 'antd';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormCollapse,
        Input,
    },
});

const form = createForm();
/*
//FormCollapse与FormTab不同的是，它可以同时打开多个折叠面板，不像Tab每次只能打开一个面板
返回值是IFormCollapse类型
export interface IFormCollapse {
    activeKeys: ActiveKeys;
    hasActiveKey(key: ActiveKey): boolean;
    setActiveKeys(key: ActiveKeys): void;
    addActiveKey(key: ActiveKey): void;
    removeActiveKey(key: ActiveKey): void;
    toggleActiveKey(key: ActiveKey): void;
}
*/
const formCollapse = FormCollapse.createFormCollapse();

//这个组件偶尔也能用一下
export default () => {
    return (
        <FormProvider form={form}>
            <FormLayout labelCol={6} wrapperCol={10}>
                <SchemaField>
                    <SchemaField.Void
                        title="折叠面板"
                        x-decorator="FormItem"
                        x-component="FormCollapse" //容器组件
                        x-component-props={{
                            formCollapse, //绑定FormCollapse的Model数据
                        }}
                    >
                        <SchemaField.Void
                            name="panel1" //面板key
                            x-component="FormCollapse.CollapsePanel" //容器的面板数据
                            x-component-props={{
                                header: '面板1', //标题数据
                            }}
                        >
                            <SchemaField.String
                                name="aaa"
                                title="AAA"
                                x-decorator="FormItem"
                                required
                                x-component="Input"
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="panel2"
                            x-component="FormCollapse.CollapsePanel"
                            x-component-props={{ header: '面板2' }}
                        >
                            <SchemaField.String
                                name="bbb"
                                title="BBB"
                                x-decorator="FormItem"
                                required
                                x-component="Input"
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="panel3"
                            x-component="FormCollapse.CollapsePanel"
                            x-component-props={{ header: '面板3' }}
                        >
                            <SchemaField.String
                                name="ccc"
                                title="CCC"
                                x-decorator="FormItem"
                                required
                                x-component="Input"
                            />
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField>
                <FormButtonGroup.FormItem>
                    <Button
                        onClick={() => {
                            form.query('panel3').take((field) => {
                                field.visible = !field.visible;
                            });
                        }}
                    >
                        显示/隐藏最后一个Tab
                    </Button>
                    <Button
                        onClick={() => {
                            formCollapse.toggleActiveKey('panel2');
                        }}
                    >
                        切换第二个Tab
                    </Button>
                    <Submit onSubmit={console.log}>提交</Submit>
                </FormButtonGroup.FormItem>
                <FormConsumer>
                    {(form) => {
                        return <div>{JSON.stringify(form.values)}</div>;
                    }}
                </FormConsumer>
            </FormLayout>
        </FormProvider>
    );
};
