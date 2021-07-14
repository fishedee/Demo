import { autorun, observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { FormProvider, Field, FieldType, validate } from './Context';
import Input from './Input';
import InputDigit from './InputDigit';
import Password from './Password';
import Label from './Label';
import FormItem from './FormItem';
import RequireValidator from './RequireValidator';

const data = observable({
    name: {
        title: '名字',
        value: '',
        errors: [] as string[],
        visible: true,
        component: Input,
        componentProps: {
            placeholder: '你是谁',
        },
        decorator: FormItem,
        decoratorProps: {},
        validator: [RequireValidator()],
        onInput: function (e: any) {
            data.name.value = e.target.value;
            data.name.errors = validate(data.name.value, data.name.validator);
        },
    },
    nameLength: {
        title: '名字长度',
        value: 0,
        errors: [] as string[],
        visible: true,
        component: Label,
        componentProps: {
            disabled: true,
        },
        decorator: FormItem,
        decoratorProps: {},
        validator: [RequireValidator()],
        onInput: function (e: any) {},
    },
    age: {
        title: '年龄',
        value: undefined,
        errors: [] as string[],
        visible: true,
        component: InputDigit,
        componentProps: {},
        decorator: FormItem,
        decoratorProps: {
            style: { height: 20 },
        },
        validator: [RequireValidator()],
        onInput: function (e: any) {
            data.age.value = e.target.value;
            data.age.errors = validate(data.age.value, data.age.validator);
        },
    },
    password: {
        title: '密码',
        value: undefined,
        errors: [] as string[],
        visible: true,
        component: Password,
        componentProps: {},
        decorator: FormItem,
        decoratorProps: {},
        validator: [RequireValidator()],
        onInput: function (e: any) {
            data.password.value = e.target.value;
            data.password.errors = validate(
                data.password.value,
                data.password.validator,
            );
        },
    },
});

//派生属性
autorun(() => {
    data.nameLength.value = data.name.value.length;
});

export default () => {
    console.log('Top Render');
    return (
        <FormProvider form={data}>
            <button
                onClick={() => {
                    let componentProps = data.name.componentProps as any;
                    if (componentProps.placeholder.indexOf('你是谁') != -1) {
                        componentProps.placeholder = '我是我';
                    } else {
                        componentProps.placeholder = '你是谁';
                    }
                }}
            >
                切换name组件的componentProps[placeholder]
            </button>
            <Field name="name" />
            <Field name="nameLength" />
            <button
                onClick={() => {
                    let decoratorProps = data.age.decoratorProps as any;
                    decoratorProps.style.height += 5;
                }}
            >
                切换age组件的decoratorProps[style.height]
            </button>
            <Field name="age" />
            <button
                onClick={() => {
                    let field = data.password;
                    if (field.component == Password) {
                        field.component = Input;
                    } else {
                        field.component = Password;
                    }
                }}
            >
                切换password组件的Component
            </button>
            <Field name="password" />
        </FormProvider>
    );
};
