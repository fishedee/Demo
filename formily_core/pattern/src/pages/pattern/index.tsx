import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { useMemo } from 'react';
import { sleep } from '@/utils';
import { Field } from '@formily/react';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd';

export default () => {
    const form = useMemo(() => {
        return createForm({
            initialValues: {
                username: 'a',
                username2: 'b',
                username3: 'c',
                username4: 'd',
            },
            effects() {},
        });
    }, []);

    return (
        <Form
            form={form}
            layout="vertical"
            size="small"
            onAutoSubmit={console.log}
        >
            <Field
                name="username"
                title="用户名"
                //交互模式，可编辑，框是深灰
                pattern="editable"
                required
                decorator={[FormItem]}
                component={[Input, {}]}
            />
            <Field
                name="username2"
                title="用户名2"
                //交互模式，不可编辑，框是浅灰色的，像被禁用了
                pattern="disabled"
                required
                decorator={[FormItem]}
                component={[Input, {}]}
            />
            <Field
                name="username3"
                title="用户名3"
                //交互模式，不可编辑，框是深灰
                pattern="readOnly"
                required
                decorator={[FormItem]}
                component={[Input, {}]}
            />
            <Field
                //交互模式，不可编辑，没有框
                name="username4"
                title="用户名4"
                pattern="readPretty"
                required
                decorator={[FormItem]}
                component={[Input, {}]}
            />
        </Form>
    );
};
