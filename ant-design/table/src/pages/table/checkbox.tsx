import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];
export default () => {
    let [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
    const rowSelection = {
        //可以设置为单选
        //type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            //第1个参数是选中的key，第2个参数是选中的行
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                'selectedRows: ',
                selectedRows,
            );
            setSelectedRowKeys(selectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
            //可以设定哪个行，不能被选中
            disabled: record.name.indexOf('Joe') != -1,
            name: record.name,
        }),
    };
    return (
        <Space
            style={{
                background: 'rgb(240, 242, 245)',
                padding: '20px',
                display: 'flex',
            }}
            direction="vertical"
            size={20}
        >
            <ProCard title="选择行" bordered headerBordered>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                />
            </ProCard>
        </Space>
    );
};
