import { ArrayField, Field } from '@formily/core';
import {
    useField,
    RecursionField,
    useFieldSchema,
    Schema,
} from '@formily/react';
import { observer } from '@formily/reactive-react';
import { Tree } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { DataNode } from 'rc-tree/lib/interface';
import { TreeProps } from 'antd/lib/tree';
import React from 'react';
import { batch } from '@formily/reactive';

type VirtualScrollProps = {
    itemHeight?: number;
};

type ScrollProps = {
    y: number;
};

type CheckboxProps = {
    selectedIndex?: string;
    checkStrictly?: boolean;
};

type SelectProps = {
    selectedIndex?: string;
    multiple?: boolean;
};

type ExpandProps = {
    defaultExpand?: boolean;
    expandIndex?: string;
    autoExpandParent?: boolean;
};

type PropsType = {
    style?: object;
    recursiveIndex?: string;
    directoryStyle?: boolean;
    scroll?: ScrollProps;
    virtualScroll?: VirtualScrollProps;
    blockNode?: boolean;
    disabled?: boolean;
    showLine?: boolean | { showLeafIcon: boolean };
    select?: SelectProps;
    checkbox?: CheckboxProps;
    expand?: ExpandProps;
};

type MyTreeType = React.FC<PropsType>;

type DataSourceType = {
    key: string;
    title: string;
    currentLevel: number;
    children: DataSourceType[];
};

function getDataSourceRecursive(
    preIndex: string,
    currentLevel: number,
    data: any[],
    recursiveIndex: string,
): DataSourceType[] {
    let result: DataSourceType[] = [];
    for (var i = 0; i != data.length; i++) {
        var single: DataSourceType = {
            key: preIndex != '' ? preIndex + '.' + i : i + '',
            currentLevel: currentLevel,
            title: '',
            children: [],
        };
        let children = data[i][recursiveIndex];
        if (children && children.length != 0) {
            single.children = getDataSourceRecursive(
                single.key + '.' + recursiveIndex,
                currentLevel + 1,
                children,
                recursiveIndex,
            );
        }
        result.push(single);
    }
    return result;
}

const MyTree: MyTreeType = observer((props: PropsType) => {
    const field = useField<ArrayField>();

    //获取schema
    const schema = useFieldSchema();
    const itemsSchema: Schema['items'] = schema.items;
    let itemSchema: Schema;
    if (!itemsSchema) {
        throw new Error('schema items is undefined ' + schema);
    }
    if (Array.isArray(itemsSchema)) {
        if (itemsSchema.length == 0) {
            throw new Error('schema items is empty ' + itemsSchema);
        }
        itemSchema = itemsSchema[0];
    } else {
        itemSchema = itemsSchema;
    }

    //获取递归的字段名
    let recursiveIndex = props.recursiveIndex;
    if (!recursiveIndex || recursiveIndex == '') {
        recursiveIndex = 'children';
    }

    console.log('value', field.value);
    //拉取数据
    let dataSource: DataSourceType[] = getDataSourceRecursive(
        '',
        0,
        field.value,
        recursiveIndex,
    );

    //渲染方式
    const titleRender = (node: DataNode) => {
        const index = node.key as string;
        console.log('name', index);
        //FIXME 关键在这里报错
        //return <div>{'123'}</div>;
        return <RecursionField schema={itemSchema} name={index} />;
    };

    let MyTree: React.FC<TreeProps>;
    if (props.directoryStyle) {
        MyTree = Tree.DirectoryTree;
    } else {
        MyTree = Tree;
    }

    const onClick = () => {
        field.value[0]._expand = true;
    };
    return (
        <div>
            <button onClick={onClick}>点我</button>
            <MyTree treeData={dataSource} titleRender={titleRender} />
        </div>
    );
});

export default MyTree;
