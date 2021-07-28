import React, { useState } from 'react';
import { Tree, Switch } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                    },
                    {
                        title: (
                            //title可以是一个ReactNode
                            <>
                                <div>multiple line title</div>
                                <div>multiple line title</div>
                            </>
                        ),
                        key: '0-0-0-1',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                    },
                ],
            },
        ],
    },
    {
        title: 'parent 2',
        key: '0-1',
        children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                children: [
                    {
                        title: 'leaf',
                        key: '0-1-0-0',
                    },
                    {
                        title: 'leaf',
                        key: '0-1-0-1',
                    },
                ],
            },
        ],
    },
];

const Demo: React.FC<{}> = () => {
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };

    return (
        <div>
            <Tree
                showLine={true}
                showIcon={false}
                defaultExpandedKeys={['0-0', '0-1']}
                //defaultExpandParent={true}
                onSelect={onSelect}
                //传入是一个数组
                treeData={treeData}
            />
        </div>
    );
};

export default Demo;
