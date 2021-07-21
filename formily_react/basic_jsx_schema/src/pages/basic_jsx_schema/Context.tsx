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

let nameId = 0;

function randomName(): string {
    let id = nameId++;
    return 'random_' + id;
}

type FormConsumerProps = {
    children: (form: Form) => ReactElement;
};
export const FormConsumer = observer((props: FormConsumerProps) => {
    const form = useContext(FormContext);
    return props.children(form);
});

//状态桥接器组件
const ReactiveField = (
    props: { field: Field } & { otherProps?: object } & {
        children?: ReactNode;
    },
) => {
    let field = props.field;
    console.log('Child Component Field: ' + field.address + ' Render');
    if (!field.visible) return null;
    //渲染字段，将字段状态与UI组件关联
    //传入children
    const component = React.createElement(
        (field.component[0] as unknown) as string,
        {
            ...field.componentProps,
            ...props.otherProps,
        } as React.Attributes,
        props.children,
    );

    //渲染字段包装器
    const decorator = React.createElement(
        (field.decorator[0] as unknown) as string,
        field.decoratorProps,
        component,
    );

    return (
        <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
    );
};

export const MyArrayField = observer(
    (
        props: IFieldFactoryProps<any, any, any, any> & {
            children?: (index: number) => ReactNode | ReactNode;
        },
    ) => {
        const form = useContext(FormContext);
        const parent = useContext(FieldContext);
        const name = props.name;
        const field = form.createArrayField({
            ...props,
            name: name,
            basePath: parent?.address,
        });
        return (
            <ReactiveField
                field={field}
                otherProps={{
                    value: field.value,
                    onChange: field.onInput,
                }}
            >
                {props.children}
            </ReactiveField>
        );
    },
);

export const MyObjectField = observer(
    (
        props: IFieldFactoryProps<any, any, any, any> & {
            children?: ReactNode;
        },
    ) => {
        const form = useContext(FormContext);
        const parent = useContext(FieldContext);
        const name = props.name;
        const field = form.createObjectField({
            ...props,
            name: name,
            basePath: parent?.address,
        });
        return (
            <ReactiveField
                field={field}
                otherProps={{
                    value: field.value,
                    onChange: field.onInput,
                }}
            >
                {props.children}
            </ReactiveField>
        );
    },
);

export const MyField = observer(
    (props: IFieldFactoryProps<any, any, any, any>) => {
        const form = useContext(FormContext);
        const parent = useContext(FieldContext);
        const name = props.name;
        const field = form.createField({
            ...props,
            name: name,
            basePath: parent?.address,
        });
        return (
            <ReactiveField
                field={field}
                otherProps={{ value: field.value, onChange: field.onInput }}
            />
        );
    },
);
