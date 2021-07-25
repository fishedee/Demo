import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
    effects: () => {},
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
    },
});

export default () => {
    //ObjectField和VoidField的Component是可以为空的，不影响运行
    //https://github.com/alibaba/formily/blob/formily_next/packages/react/src/components/ReactiveField.tsx
    /*
    const renderComponent = () => {
        if (!field.component[0]) return <Fragment>{children}</Fragment>
        ....
    }
    * 当component为空的时候，直接返回一个children包围的fragment组件
    * VoidField与ObjectField的执行原理是类似的，只是FieldProvider提供的是VoidField，不是ObjectField，这样Void组件会导致values中没有void的名称字段。
    * ArrayField是没有children字段的，因为ArrayField接管了全部的渲染过程，Array组件没有Component是无法渲染任何组件出来的
     */
    return (
        <Form form={form}>
            <SchemaField>
                <SchemaField.Object name="object">
                    <SchemaField.String
                        name="input"
                        title="Object输入框"
                        x-component="Input"
                        x-decorator="FormItem"
                    />
                </SchemaField.Object>
                <SchemaField.Void name="void">
                    <SchemaField.String
                        name="input2"
                        title="Void输入框"
                        x-component="Input"
                        x-decorator="FormItem"
                    />
                </SchemaField.Void>
                <SchemaField.Array name="array">
                    <SchemaField.String
                        name="input3"
                        title="Array输入框"
                        x-component="Input"
                        x-decorator="FormItem"
                    />
                </SchemaField.Array>
            </SchemaField>
            <FormConsumer>
                {() => (
                    <code>
                        <pre>{JSON.stringify(form.values)}</pre>
                    </code>
                )}
            </FormConsumer>
        </Form>
    );
};
