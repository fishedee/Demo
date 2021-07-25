import { ArrayField, Field } from '@formily/core';
import {
    RecursionField,
    Schema,
    useField,
    useFieldSchema,
} from '@formily/react';
import { observer } from '@formily/reactive-react';
import React, { Fragment, ReactNode, useContext } from 'react';
import { ReactElement } from 'react';
import TableStyle from './style.css';

type Column = {
    style: object;
    name: string;
    schema: Schema;
};

function getColumn(schema: Schema): Column[] {
    //在当前实现中，Column层只是作为一种Schema来用，没有使用它的Field特性
    let itemsSchema: Schema['items'] = schema.items;
    const items = Array.isArray(itemsSchema) ? itemsSchema : [itemsSchema];
    const parseSource = (schema: Schema): Column[] => {
        let component = schema['x-component'];
        if (component?.indexOf('Column') != -1) {
            //获取该列的信息
            return [
                {
                    style: schema['x-component-props']?.style,
                    name: schema['x-component-props']?.title,
                    schema: schema,
                },
            ];
        }
        return [];
    };
    const reduceProperties = (schema: Schema): Column[] => {
        //对于items里面的每个schema，遍历它的Properties
        if (schema.properties) {
            return schema.reduceProperties((current, schema) => {
                return current.concat(parseSource(schema));
            }, [] as Column[]);
        } else {
            return [];
        }
    };
    return items.reduce((current, schema) => {
        //遍历每个items里面的schema
        if (schema) {
            return current.concat(reduceProperties(schema));
        }
        return current;
    }, [] as Column[]);
}
type PropsType = Field & {
    children: (index: number) => ReactElement;
};

type MyTableType = React.FC<PropsType> & {
    Column?: React.FC<any>;
};

const MyTable: MyTableType = observer((props: PropsType) => {
    const field = useField<ArrayField>();
    const fieldSchema = useFieldSchema();
    const tableColumns = getColumn(fieldSchema);
    const renderHeader = () => {
        let row = tableColumns.map((column) => {
            return (
                <td
                    style={column.style}
                    className={TableStyle.td}
                    key={column.name}
                >
                    {column.name}
                </td>
            );
        });
        return <tr>{row}</tr>;
    };
    const renderRow = (field: any, index: number) => {
        //注意这里的写法RecusionField是使用onlyRenderProperties，只渲染它的子节点
        //但是因为RecursionField传入了index作为name，所以每个Property的name为parent.address+index+field name
        let row = tableColumns.map((column) => {
            return (
                <td className={TableStyle.td} key={column.name}>
                    {
                        <RecursionField
                            name={index}
                            schema={column.schema}
                            onlyRenderProperties
                        />
                    }
                </td>
            );
        });
        return (
            <tr className={TableStyle.tr} key={index}>
                {row}
            </tr>
        );
    };
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <table className={TableStyle.table}>
                <thead>{renderHeader()}</thead>
                <tbody>
                    {field.value?.map((row, index) => {
                        return renderRow(row, index);
                    })}
                </tbody>
            </table>
            <button
                onClick={() => {
                    field.push({});
                }}
            >
                添加一行
            </button>
        </div>
    );
});

MyTable.Column = () => {
    return <Fragment></Fragment>;
};

export default MyTable;
