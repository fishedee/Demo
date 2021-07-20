import { autorun, observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { FormConsumer, FormProvider, MyField, MyObjectField } from './Context';
import Input from './Input';
import InputDigit from './InputDigit';
import Password from './Password';
import Label from './Label';
import FormItem from './FormItem';
import RequireValidator from './RequireValidator';
import { useMemo } from 'react';
import { createForm, Field, onFieldReact } from '@formily/core';
import Card from './Card';

export default () => {
    console.log('Top Render');
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                onFieldReact('nameLength', (field) => {
                    let field2 = field as Field;
                    field2.value = field2.query('.name').value()?.length;
                });
            },
        });
    }, []);
    return (
        <FormProvider form={form}>
            <MyObjectField
                title="个人信息"
                name="person"
                component={[Card,{}]}
                decorator={[FormItem]}>
                <MyField
                    title="名称"
                    name="name"
                    required
                    component={[Input, {}]}
                    decorator={[FormItem]}
                />
                <MyField
                    title="年龄"
                    name="age"
                    required
                    component={[InputDigit, {}]}
                    decorator={[FormItem, { style: { height: 30 } }]}
                />
            </MyObjectField>
            <MyObjectField
                title="联系信息"
                name="contact"
                component={[Card,{}]}
                decorator={[FormItem]}>
                <MyField
                    title="电话"
                    name="phone"
                    validator={{
                        format:'phone'
                    }}
                    required
                    component={[Input, {}]}
                    decorator={[FormItem]}
                />
                 <MyField
                    title="邮件"
                    name="email"
                    validator={{
                        format:'email'
                    }}
                    required
                    component={[Input, {}]}
                    decorator={[FormItem]}
                />
            </MyObjectField>
            <FormConsumer>
                {(form)=>{
                    return (<div>{JSON.stringify(form.values)}</div>);
                }}
            </FormConsumer>
        </FormProvider>
    );
};
