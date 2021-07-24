import React from 'react';
import {
    FormDrawer,
    FormItem,
    FormLayout,
    Input,
    Submit,
    Reset,
    FormButtonGroup,
} from '@formily/antd';
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
        <Button
            onClick={async () => {
                //FormDrawer的用法与FormDialog的用法是一样的，这里也没啥好说的了
                let drawer = FormDrawer('抽屉表单', (resolve) => {
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
                            <FormDrawer.Footer>
                                <FormButtonGroup align="right">
                                    <Submit onClick={resolve}>提交</Submit>
                                    <Reset>重置</Reset>
                                </FormButtonGroup>
                            </FormDrawer.Footer>
                        </FormLayout>
                    );
                });
                let result = await drawer.open({
                    initialValues: {
                        aaa: '123',
                    },
                });
                console.log(result);
            }}
        >
            点我打开表单
        </Button>
    );
};
