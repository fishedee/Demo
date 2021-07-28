import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            },
            {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [
                    {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park',
                    },
                ],
            },
            {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [
                    {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                            {
                                key: 1311,
                                name: 'Jim Green jr.',
                                age: 25,
                                address: 'London No. 3 Lake Park',
                            },
                            {
                                key: 1312,
                                name: 'Jimmy Green sr.',
                                age: 18,
                                address: 'London No. 4 Lake Park',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];
export default () => {
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
            <ProCard title="tree与children" bordered headerBordered>
                <Table
                    columns={columns}
                    dataSource={data}
                    //默认遇到children字段就会出现伸展按钮，以展示树形数据，该字段不设置也会自动生效的
                    //childrenColumnName={'children'}
                />
            </ProCard>
        </Space>
    );
};
