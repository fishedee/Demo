import { autorun, observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { FormConsumer, FormProvider } from './Context';
import Input from './Input';
import InputDigit from './InputDigit';
import Password from './Password';
import Label from './Label';
import FormItem from './FormItem';
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import Card from './Card';
import ArrayItems from './ArrayItemsSchema';
import { Schema, SchemaOptions } from './Schema';
import { JsonSchema } from './JsonSchema';
import { JsxSchema, JsxSchemaContext } from './JsxSchema';

let options: SchemaOptions = {
    Input: Input,
    InputDigit: InputDigit,
    Password: Password,
    Label: Label,
    Card: Card,
    ArrayItems: ArrayItems,
    FormItem: FormItem,
};

const MyJsxSchma = JsxSchema();
export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {},
        });
    }, []);

    return (
        <FormProvider form={form}>
            <Schema options={options}>
                <MyJsxSchma.Object
                    name={'person'}
                    title={'个人信息'}
                    component={['Card', {}]}
                    decorator={['FormItem', {}]}
                >
                    <MyJsxSchma.String
                        name={'name'}
                        title={'名称'}
                        required={true}
                        component={['Input', {}]}
                        decorator={['FormItem', {}]}
                    />
                    <MyJsxSchma.Number
                        name={'age'}
                        title={'年龄'}
                        required={true}
                        component={['InputDigit', {}]}
                        decorator={['FormItem', {}]}
                    />
                </MyJsxSchma.Object>
                <MyJsxSchma.Array
                    name={'contact'}
                    title={'联系方式'}
                    component={['ArrayItems', {}]}
                    decorator={['FormItem', {}]}
                >
                    <MyJsxSchma.Object
                        title={'信息'}
                        component={['Card', {}]}
                        decorator={['FormItem', {}]}
                    >
                        <MyJsxSchma.String
                            name={'phone'}
                            title={'电话'}
                            required={true}
                            format={'phone'}
                            component={['Input', {}]}
                            decorator={['FormItem', {}]}
                        />
                        <MyJsxSchma.String
                            name={'email'}
                            title={'电子邮件'}
                            required={true}
                            format={'email'}
                            component={['Input', {}]}
                            decorator={['FormItem', {}]}
                        />
                    </MyJsxSchma.Object>
                </MyJsxSchma.Array>
            </Schema>
            <FormConsumer>
                {(form) => {
                    return <div>{JSON.stringify(form.values)}</div>;
                }}
            </FormConsumer>
        </FormProvider>
    );
};
