import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
    {
        title: '名字', //标题
        dataIndex: 'name', //dataIndex
        key: 'name', //key，一般与dataIndex一致的
        render: (text: string) => <a>{text}</a>, //渲染每个单元格的数据，第1个参数为单元格，第2个参数为行数据，第3个参数是index
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
];

const data = [];
for (var i = 0; i != 100; i++) {
    data.push({
        key: i,
        name: 'fish_' + i,
        age: i,
        address: 'address_' + i,
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
            <ProCard title="分页" bordered headerBordered>
                <Table
                    columns={columns}
                    dataSource={data}
                    //不显式分页器，无论数据有多少，都在一页里面显式完毕
                    pagination={false}
                />
            </ProCard>
        </Space>
    );
};
