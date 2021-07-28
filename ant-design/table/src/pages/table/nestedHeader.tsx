import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: 'left',
    },
    {
        title: 'Other',
        //使用Children就可以nestedHeader
        children: [
            {
                title: 'Age',
                //子节点需要有dataIndex，key与width
                dataIndex: 'age',
                key: 'age',
                width: 150,
            },
            {
                //非子节点，只需要一个title
                title: 'Address',
                children: [
                    {
                        title: 'Street',
                        dataIndex: 'street',
                        key: 'street',
                        width: 150,
                    },
                    {
                        title: 'Block',
                        children: [
                            {
                                title: 'Building',
                                dataIndex: 'building',
                                key: 'building',
                                width: 100,
                            },
                            {
                                title: 'Door No.',
                                dataIndex: 'number',
                                key: 'number',
                                width: 100,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'Company',
        children: [
            {
                title: 'Company Address',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
                width: 200,
            },
            {
                title: 'Company Name',
                dataIndex: 'companyName',
                key: 'companyName',
            },
        ],
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
        fixed: 'right',
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
    });
}

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
            <ProCard title="嵌套header" bordered headerBordered>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                />
            </ProCard>
        </Space>
    );
};
