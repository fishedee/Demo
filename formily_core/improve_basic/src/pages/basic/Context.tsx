import React, {
    createContext,
    ReactElement,
    useContext,
    FunctionComponent,
    ReactNode,
    Component,
} from 'react';
import { observer } from '@formily/reactive-react';
import { Field, Form, IFieldFactoryProps } from '@formily/core';

//创建上下文，方便Field消费
const FormContext = createContext<Form>({} as Form);
//创建上下文，方便FormItem消费
const FieldContext = createContext<Field>({} as Field);

export { FormContext };
export { FieldContext };

//表单管理入口
type FormProviderProps = {
    form: Form;
    children: ReactNode;
};
export const FormProvider = (props: FormProviderProps) => {
    return (
        <FormContext.Provider value={props.form}>
            {props.children}
        </FormContext.Provider>
    );
};

//状态桥接器组件
export const MyField = observer(
    (props: IFieldFactoryProps<any, any, any, any>) => {
        console.log('Child Component Field: ' + props.name + ' Render');
        const form = useContext(FormContext);
        const field = form.createField(props);
        if (!field.visible) return null;
        //渲染字段，将字段状态与UI组件关联
        const component = React.createElement(
            (field.component[0] as unknown) as string,
            {
                ...field.componentProps,
                value: field.value,
                onChange: field.onInput,
            } as React.Attributes,
        );

        //渲染字段包装器
        const decorator = React.createElement(
            (field.decorator[0] as unknown) as string,
            field.decoratorProps,
            component,
        );

        return (
            <FieldContext.Provider value={field}>
                {decorator}
            </FieldContext.Provider>
        );
    },
);
