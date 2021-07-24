import React from 'react';
import {
    FormTab,
    FormItem,
    Input,
    FormButtonGroup,
    Submit,
    Form,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';
import { Button } from 'antd';

/*
FormTab的源代码
//FormTab本身就是一个model
const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}

//初始化的时候用传入的formTab，或者自己创建一个FromTab
const _formTab = useMemo(() => {
    return formTab ? props.formTab : createFormTab()
}, [])
const activeKey = props.activeKey || _formTab?.activeKey

//在Tabs的onChange的时候，更改activeKey，注意Tabs控件是受控组件
<Tabs
      {...props}
      className={cls(prefixCls, props.className)}
      activeKey={activeKey}
      onChange={(key) => {
        props.onChange?.(key)
        formTab?.setActiveKey?.(key)
      }}
    >
    xxx
</Tabs>
*/
const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormTab,
        Input,
    },
});

const form = createForm();

//获取FormTab特定的ViewModel，可以控制FormTab的激活的位置
/*
返回值为IFormTab，一个observable对象
export interface IFormTab {
    activeKey: string;
    setActiveKey(key: string): void;
}
*/
const formTab = FormTab.createFormTab();

//这个示例其实很少用，将多个Tab聚合为一个表单来提交，这样是不合理的
export default () => {
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormTab" //顶部Tab
                    x-component-props={{
                        formTab, //这里要传入FormTab的model
                    }}
                >
                    <SchemaField.Void
                        name="tab1" //这里作为tab的key
                        x-component="FormTab.TabPane"
                        x-component-props={{
                            tab: '标签1', //这里填写标签的名称
                        }}
                    >
                        <SchemaField.String
                            name="aaa"
                            x-decorator="FormItem"
                            title="AAA"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        name="tab2"
                        x-component="FormTab.TabPane"
                        x-component-props={{ tab: '标签2' }}
                    >
                        <SchemaField.String
                            name="bbb"
                            x-decorator="FormItem"
                            title="BBB"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        name="tab3" //active Key
                        x-component="FormTab.TabPane"
                        x-component-props={{ tab: '标签3' }}
                    >
                        <SchemaField.String
                            name="ccc"
                            x-decorator="FormItem"
                            title="CCC"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField>
            <FormButtonGroup.FormItem>
                <Button
                    onClick={() => {
                        form.query('tab3').take((field) => {
                            field.visible = !field.visible;
                        });
                    }}
                >
                    显示/隐藏最后一个Tab
                </Button>
                <Button
                    onClick={() => {
                        formTab.setActiveKey('tab2');
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
        </FormProvider>
    );
};
