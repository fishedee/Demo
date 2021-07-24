import React from 'react';
import { FormDialog, FormItem, FormLayout, Input, Space } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
    },
});

export default () => {
    return (
        <Space>
            <Button
                onClick={async () => {
                    //命令方式的Modal表单
                    //Modal里面自带一个FormProvider
                    //FormDialog.Footer是额外插入的dom
                    let dialog = FormDialog('弹窗表单', () => {
                        return (
                            <FormLayout labelCol={6} wrapperCol={10}>
                                <SchemaField>
                                    <SchemaField.String
                                        name="aaa"
                                        required
                                        title="输入框1"
                                        x-decorator="FormItem"
                                        x-component="Input"
                                    />
                                    <SchemaField.String
                                        name="bbb"
                                        required
                                        title="输入框2"
                                        x-decorator="FormItem"
                                        x-component="Input"
                                    />
                                    <SchemaField.String
                                        name="ccc"
                                        required
                                        title="输入框3"
                                        x-decorator="FormItem"
                                        x-component="Input"
                                    />
                                    <SchemaField.String
                                        name="ddd"
                                        required
                                        title="输入框4"
                                        x-decorator="FormItem"
                                        x-component="Input"
                                    />
                                </SchemaField>
                                <FormDialog.Footer>
                                    <span
                                        style={{
                                            //看这里https://github.com/alibaba/formily/blob/formily_next/packages/antd/src/form-dialog/index.tsx
                                            marginLeft: 4, //Footer的实现也很巧妙，它在FormProvider里面创造了一个div，并绑定了一个ref
                                            //然后在useLayoutEffect里面，根据div所在位置找到了form的dom，然后form的dom找到了footer的位置
                                            //最后在footer的位置重新render自己
                                        }}
                                    >
                                        扩展文案
                                    </span>
                                </FormDialog.Footer>
                            </FormLayout>
                        );
                    });
                    //open是一个Promise的返回值，它实际是表单的values值返回了
                    let result = await dialog.open({
                        initialValues: {
                            aaa: '123',
                        },
                    });
                    console.log(result);
                }}
            >
                点我打开表单
            </Button>
            <Button
                onClick={async () => {
                    //表单的第一个参数可以是Modal类型的对象
                    let dialog = FormDialog(
                        {
                            title: '弹窗表单',
                            okText: '确认',
                            cancelText: '取消',
                        },
                        //不要尝试自己用FormProvider，这是没用的，因为在open以后它指定了从它自己创造form里面拉数据
                        () => {
                            return (
                                <FormLayout labelCol={6} wrapperCol={10}>
                                    <SchemaField>
                                        <SchemaField.String
                                            name="aaa"
                                            required
                                            title="输入框1"
                                            x-decorator="FormItem"
                                            x-component="Input"
                                        />
                                        <SchemaField.String
                                            name="bbb"
                                            required
                                            title="输入框2"
                                            x-decorator="FormItem"
                                            x-component="Input"
                                        />
                                        <SchemaField.String
                                            name="ccc"
                                            required
                                            title="输入框3"
                                            x-decorator="FormItem"
                                            x-component="Input"
                                        />
                                        <SchemaField.String
                                            name="ddd"
                                            required
                                            title="输入框4"
                                            x-decorator="FormItem"
                                            x-component="Input"
                                        />
                                    </SchemaField>
                                    <FormDialog.Footer>
                                        <span style={{ marginLeft: 4 }}>
                                            扩展文案
                                        </span>
                                    </FormDialog.Footer>
                                </FormLayout>
                            );
                        },
                    );
                    let result = await dialog.open({
                        initialValues: {
                            aaa: '123',
                        },
                    });
                    console.log(result);
                }}
            >
                点我打开表单2
            </Button>
        </Space>
    );
};
