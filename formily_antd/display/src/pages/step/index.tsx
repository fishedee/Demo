import React from 'react';
import { FormStep, FormItem, Input, FormButtonGroup } from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, FormConsumer, createSchemaField } from '@formily/react';
import { Button } from 'antd';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormStep,
        Input,
    },
});

const form = createForm();
//类似FormStep的实现
/*
返回值是FormStep
export interface IFormStep {
    connect: (steps: SchemaStep[], field: VoidField) => void;
    current: number;
    allowNext: boolean;
    allowBack: boolean;
    setCurrent(key: number): void;
    submit: Form['submit'];
    next(): void;
    back(): void;
}
*/
const formStep = FormStep.createFormStep();

//这种方法用得比较多
export default () => {
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormStep" //顶部的容器组件
                    x-component-props={{
                        formStep, //绑定FormStep的Model数据
                    }}
                >
                    <SchemaField.Void
                        x-component="FormStep.StepPane" //下一级的Pane组件
                        x-component-props={{
                            title: '第一步', //标题
                        }}
                    >
                        <SchemaField.String
                            name="aaa"
                            x-decorator="FormItem"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="FormStep.StepPane"
                        x-component-props={{ title: '第二步' }}
                    >
                        <SchemaField.String
                            name="bbb"
                            x-decorator="FormItem"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="FormStep.StepPane"
                        x-component-props={{ title: '第三步' }}
                    >
                        <SchemaField.String
                            name="ccc"
                            x-decorator="FormItem"
                            required
                            x-component="Input"
                        />
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField>
            <FormConsumer>
                {() => (
                    //将整个组件放在FormConsumer，这里沿用了React的render做法，每次表单变化，都出现render
                    //这是一种做法
                    <FormButtonGroup>
                        <Button
                            disabled={!formStep.allowBack}
                            onClick={() => {
                                //返回是不需要对表单进行validate的
                                formStep.back();
                            }}
                        >
                            上一步
                        </Button>
                        <Button
                            disabled={!formStep.allowNext}
                            onClick={() => {
                                //每次进行next的时候，FormStep内部先对表单进行validate
                                formStep.next();
                            }}
                        >
                            下一步
                        </Button>
                        <Button
                            disabled={formStep.allowNext}
                            onClick={() => {
                                formStep.submit(console.log);
                            }}
                        >
                            提交
                        </Button>
                    </FormButtonGroup>
                )}
            </FormConsumer>
        </FormProvider>
    );
};
