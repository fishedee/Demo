import { MyField, MyObjectField, MyArrayField } from './Context';
import { Fragment, ReactElement } from 'react';
import { useContext, ReactNode } from 'react';
import { createContext } from 'react';
import { JsonSchema } from './JsonSchema';

//创建上下文，方便Schema获取到Component字符串的实际指向
export type SchemaOptions = {
    [name in string]:
        | React.FunctionComponent<any>
        | React.Component<any, any, any>;
};

export const SchemaOptionsContext = createContext<SchemaOptions>(
    {} as SchemaOptions,
);

//创建上下文，方便RecusrionField获取到当前的子Schema
export const FieldSchemaContext = createContext<JsonSchema>({} as JsonSchema);

type RecursionFieldProps = {
    name: string;
    schema: JsonSchema;
    onlyRenderProperties: boolean;
};

export const RecursionField: React.FC<RecursionFieldProps> = (props) => {
    const fieldSchema = props.schema;
    let name = fieldSchema.name ? fieldSchema.name : props.name;
    if (name === undefined) {
        name = '';
    }
    let validator: { format: string } | undefined = undefined;
    if (fieldSchema.format) {
        validator = { format: fieldSchema.format };
    }
    const options = useContext(SchemaOptionsContext);
    const renderProperties = (
        schemas: { [name in string]: JsonSchema },
    ): ReactElement => {
        let result = [];
        for (var key in schemas) {
            let subSchema = schemas[key];
            result.push(
                <RecursionField
                    key={key}
                    onlyRenderProperties={false}
                    schema={subSchema}
                    name=""
                />,
            );
        }
        return <Fragment>{result}</Fragment>;
    };

    const render = (): ReactNode => {
        if (fieldSchema.type == 'object') {
            if (props.onlyRenderProperties) {
                return renderProperties(fieldSchema.properties);
            }
            return (
                <MyObjectField
                    title={fieldSchema.title}
                    name={name}
                    required={fieldSchema.required}
                    validator={validator}
                    component={[
                        options[fieldSchema['x-component']],
                        fieldSchema['x-component-props'],
                    ]}
                    decorator={[
                        options[fieldSchema['x-decorator']],
                        fieldSchema['x-decorator-props'],
                    ]}
                >
                    {renderProperties(fieldSchema.properties)}
                </MyObjectField>
            );
        } else if (fieldSchema.type == 'array') {
            //array不渲染children，因为array的业务方案太多了
            if (props.onlyRenderProperties) {
                return renderProperties(fieldSchema.properties);
            }
            return (
                <MyArrayField
                    title={fieldSchema.title}
                    name={name}
                    required={fieldSchema.required}
                    validator={validator}
                    component={[
                        options[fieldSchema['x-component']],
                        fieldSchema['x-component-props'],
                    ]}
                    decorator={[
                        options[fieldSchema['x-decorator']],
                        fieldSchema['x-decorator-props'],
                    ]}
                />
            );
        } else if (
            fieldSchema.type == 'number' ||
            fieldSchema.type == 'string'
        ) {
            return (
                <MyField
                    title={fieldSchema.title}
                    name={name}
                    required={fieldSchema.required}
                    validator={validator}
                    component={[
                        options[fieldSchema['x-component']],
                        fieldSchema['x-component-props'],
                    ]}
                    decorator={[
                        options[fieldSchema['x-decorator']],
                        fieldSchema['x-decorator-props'],
                    ]}
                />
            );
        }
    };

    return (
        <FieldSchemaContext.Provider value={fieldSchema}>
            {render()}
        </FieldSchemaContext.Provider>
    );
};

type SchemaProps = {
    options: SchemaOptions;
    schema: JsonSchema;
};

export function Schema(props: SchemaProps) {
    return (
        <SchemaOptionsContext.Provider value={props.options}>
            <RecursionField
                onlyRenderProperties={true}
                schema={props.schema}
                name=""
            />
        </SchemaOptionsContext.Provider>
    );
}
