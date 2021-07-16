import { autorun, observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import { FormProvider, MyField } from './Context';
import Input from './Input';
import InputDigit from './InputDigit';
import Password from './Password';
import Label from './Label';
import FormItem from './FormItem';
import RequireValidator from './RequireValidator';
import { useMemo } from 'react';
import { createForm, Field, onFieldReact } from '@formily/core';

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
            <button
                onClick={() => {
                    form.getFieldState('name', (state) => {
                        if (
                            state.componentProps?.placeholder?.indexOf(
                                '你是谁',
                            ) != -1
                        ) {
                            state.componentProps = { placeholder: '我是我' };
                        } else {
                            state.componentProps = { placeholder: '你是谁' };
                        }
                    });
                }}
            >
                切换name组件的componentProps[placeholder]
            </button>
            <MyField
                title="名称"
                name="name"
                component={[Input, {}]}
                decorator={[FormItem]}
            />
            <MyField
                title="名称长度"
                name="nameLength"
                component={[Label]}
                decorator={[FormItem]}
            />
            <button
                onClick={() => {
                    form.getFieldState('age', (state) => {
                        let decoratorProps = state.decorator[1] as any;
                        decoratorProps.style.height += 5;
                    });
                }}
            >
                切换age组件的decoratorProps[style.height]
            </button>
            <MyField
                title="年龄"
                name="age"
                component={[InputDigit, {}]}
                decorator={[FormItem, { style: { height: 30 } }]}
            />
            <button
                onClick={() => {
                    form.getFieldState('password', (state) => {
                        let components = state.component as any;
                        if (components[0] === Password) {
                            state.component = [Input];
                        } else {
                            state.component = [Password];
                        }
                    });
                }}
            >
                切换password组件的Component
            </button>
            <MyField
                title="密码"
                name="password"
                component={[Password]}
                decorator={[FormItem, {}]}
            />
        </FormProvider>
    );
};
