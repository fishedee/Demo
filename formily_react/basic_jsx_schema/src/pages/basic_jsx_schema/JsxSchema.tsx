import { FunctionComponent, useContext } from 'react';
import { ReactNode } from 'react';
import { createContext } from 'react';
import { JsonSchema } from './JsonSchema';

type BasicJsxSchemaProps = {
    title?: string;
    name?: string;
    required?: boolean;
    format?: string;
    component: [string, any];
    decorator: [string, any];
};

type ObjectJsxSchemaProps = {
    children: ReactNode;
} & BasicJsxSchemaProps;

type ArrayJsxSchemaProps = {
    children: ReactNode;
} & BasicJsxSchemaProps;

export const JsxSchemaContext = createContext<JsonSchema>({} as JsonSchema);

export function JsxSchema() {
    const Common: FunctionComponent<
        BasicJsxSchemaProps & {
            type: 'string' | 'number' | 'object' | 'array';
        }
    > = (props) => {
        let parent = useContext(JsxSchemaContext);
        let data: JsonSchema = {
            type: props.type,
            title: props.title,
            name: props.name,
            required: props.required,
            format: props.format,
            'x-component': props.component[0],
            'x-component-props': props.component[1],
            'x-decorator': props.decorator[0],
            'x-decorator-props': props.decorator[1],
        };
        //添加上级的schema
        if (parent.type == 'array') {
            if (!parent.items) {
                //首次添加进入array
                parent.items = data;
            } else {
                //而后进入array
                if (!parent.properties) {
                    parent.properties = {};
                }
                parent.properties[data.name!] = data;
            }
        } else if (parent.type == 'object') {
            if (!parent.properties) {
                parent.properties = {};
            }
            parent.properties[data.name!] = data;
        } else {
            throw new Error('unknown component!');
        }

        //让子schema递归下去
        if (data.type == 'array' || data.type == 'object') {
            return (
                <JsxSchemaContext.Provider value={data}>
                    {props.children}
                </JsxSchemaContext.Provider>
            );
        } else {
            return null;
        }
    };
    const StringJsx = (props: BasicJsxSchemaProps) => {
        return <Common type="string" {...props} />;
    };
    const NumberJsx = (props: BasicJsxSchemaProps) => {
        return <Common type="number" {...props} />;
    };
    const ObjectJsx = (props: ObjectJsxSchemaProps) => {
        return <Common type="object" {...props} />;
    };
    const ArrayJsx = (props: ArrayJsxSchemaProps) => {
        return <Common type="array" {...props} />;
    };
    return {
        String: StringJsx,
        Number: NumberJsx,
        Object: ObjectJsx,
        Array: ArrayJsx,
    };
}
