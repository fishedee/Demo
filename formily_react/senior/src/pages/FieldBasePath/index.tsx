import { createForm } from '@formily/core';
import {
    createSchemaField,
    Field,
    FormConsumer,
    ObjectField,
} from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
    effects: () => {},
});

const form2 = createForm({
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
    //Field字段下面的BasePath可以改写Field的父级路径
    //https://github.com/alibaba/formily/blob/formily_next/packages/react/src/components/Field.tsx
    /*
    const form = useForm()
    const parent = useField()
    const field = useAttach(
        form.createField({ basePath: parent?.address, ...props })
    )
    //以上是Field的源代码，默认是取上级Field的address作为basePath，我们可以在props中传递basePath来改写这个属性
    //另外，我们也能看到，父级没有ObjectField组件，也能使用Form的createField来创建跨下级的Field。Formily会自动补充中间缺失的Field
    //注意，SchemaField上的x-basePath属性是没用的，不要使用。
     */
    return (
        <div>
            <Form form={form}>
                <Field
                    name="input"
                    basePath="mm"
                    title="Object输入框"
                    component={[Input, {}]}
                    decorator={[FormItem, {}]}
                />
                <Field
                    name="input"
                    basePath="kk"
                    title="Object输入框"
                    component={[Input, {}]}
                    decorator={[FormItem, {}]}
                />
                <FormConsumer>
                    {() => (
                        <code>
                            <pre>{JSON.stringify(form.values)}</pre>
                        </code>
                    )}
                </FormConsumer>
            </Form>
        </div>
    );
};
