import React, {
    createContext,
    ReactElement,
    useContext,
    FunctionComponent,
    ReactNode,
} from 'react';
import { observer } from '@formily/reactive-react';

export type ValidatorType = (data: any) => string;

export type FieldType = {
    title: string;
    value: any;
    errors: string[];
    visible: boolean;
    validator: ValidatorType[];
    component: (props: any) => JSX.Element;
    componentProps: object;
    decorator: React.FunctionComponent;
    decoratorProps: object;
    onInput: (data: any) => void;
};

export type FormType = {
    [key in string]: FieldType;
};

export function validate(data: any, validator: ValidatorType[]): string[] {
    let errors = [];
    for (let i in validator) {
        let singleValidator = validator[i];
        let error = singleValidator(data);
        if (error != '') {
            errors.push(error);
        }
    }
    return errors;
}

//创建上下文，方便Field消费
const FormContext = createContext<FormType>({});
//创建上下文，方便FormItem消费
const FieldContext = createContext<FieldType>({} as FieldType);

export { FormContext };
export { FieldContext };

//表单管理入口
type FormProviderProps = {
    form: FormType;
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
type FieldWrapperType = {
    name: string;
};
export const Field = observer((props: FieldWrapperType) => {
    console.log('Child Component Field: ' + props.name + ' Render');
    const form = useContext(FormContext);
    const field = form[props.name];
    if (!field.visible) return null;
    //渲染字段，将字段状态与UI组件关联
    const component = React.createElement(field.component, {
        ...field.componentProps,
        value: field.value,
        onChange: field.onInput,
    } as React.Attributes);

    //渲染字段包装器
    const decorator = React.createElement(
        field.decorator,
        field.decoratorProps,
        component,
    );

    return (
        <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
    );
});
