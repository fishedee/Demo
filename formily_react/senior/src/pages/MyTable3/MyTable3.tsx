import { ArrayField, Field } from '@formily/core';
import {
    RecursionField,
    Schema,
    useField,
    useFieldSchema,
    useForm,
} from '@formily/react';
import { observer } from '@formily/reactive-react';
import React, { Fragment, ReactNode, useContext } from 'react';
import { createContext } from 'react';
import { ReactElement } from 'react';
import TableStyle from './style.css';

type Column = {
    style: object;
    title: string;
    name: string;
    schema: Schema;
};

const ArrayContext = createContext({} as ArrayField);
const ArrayIndexContext = createContext(0);

function getColumn(schema: Schema): Column[] {
    //在当前实现中，Column层看成是Field
    let itemsSchema: Schema['items'] = schema.items;
    const items = Array.isArray(itemsSchema) ? itemsSchema : [itemsSchema];
    //获取当前array的field
    let form = useForm();
    let field = useField();
    const parseSource = (schema: Schema): Column[] => {
        //在渲染的时候，手动拿出每个Column的Field，并且将Schema作为保底逻辑
        //这里的写法，其实是先取field数据，再去createField
        //当第一次render的时候，Field不存在时，返回值为undefined
        let columnField = form.query(field.address + '.' + schema.name).take();
        console.log('field:', columnField);
        let component = schema['x-component'];
        if (component?.indexOf('Column') != -1) {
            //获取该列的信息
            return [
                {
                    name: schema.name + '',
                    style:
                        columnField?.componentProps?.stype ||
                        schema['x-component-props']?.style,
                    title:
                        columnField?.componentProps?.title ||
                        schema['x-component-props']?.title,
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
    Index?: React.FC<any>;
    Remove?: React.FC<any>;
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
                    {column.title}
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
        //在这里注入index
        return (
            <ArrayIndexContext.Provider value={index}>
                <tr className={TableStyle.tr} key={index}>
                    {row}
                </tr>
            </ArrayIndexContext.Provider>
        );
    };
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <ArrayContext.Provider value={field}>
                <table className={TableStyle.table}>
                    <thead>{renderHeader()}</thead>
                    <tbody>
                        {field.value?.map((row, index) => {
                            return renderRow(row, index);
                        })}
                    </tbody>
                </table>
            </ArrayContext.Provider>
            {tableColumns.map((column) => {
                //这里实际渲染每个Column，以保证Column能接收到Reaction
                //注意要使用onlyRenderSelf
                return (
                    <RecursionField
                        key={column.name}
                        name={column.name}
                        schema={column.schema}
                        onlyRenderSelf
                    />
                );
            })}
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

MyTable.Index = () => {
    const indexContext = useContext(ArrayIndexContext);
    return <span>{indexContext + 1}</span>;
};

MyTable.Remove = () => {
    const arrayContext = useContext(ArrayContext);
    const indexContext = useContext(ArrayIndexContext);
    return (
        <a
            onClick={() => {
                arrayContext.remove(indexContext);
            }}
        >
            {'删除'}
        </a>
    );
};

export default MyTable;
