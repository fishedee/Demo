import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';

//每个column都有一个宽度
//当总宽度大于默认值100%的时候，就会出现部分列压缩在一起显示
//最终导致，压缩列的内容竖起来显示，导致行高突然变高了很多，试试把x: 1500打开就看到了
const columns = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left', //在左边固定不动，fixedColumn
    },
    {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left', //在左边固定不动，fixedColumn
    },
    {
        title: 'Column 1',
        dataIndex: 'address', //多列之间可以用同一个dataIndex，但不能用同一个key
        key: '1',
        width: 150,
    },
    {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width: 150,
        //这一行的内容超级长，不用ellipsis会导致行高过分增高，因此要加上ellipsis
        ellipsis: true,
        render: (value) => {
            return value + value + value + value;
        },
    },
    {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
        width: 150,
    },
    {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
        width: 150,
    },
    {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width: 150,
    },
    {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width: 150,
    },
    {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7', //没有设置宽度，总宽度的剩余宽度会被这个列占用
    },
    { title: 'Column 8', dataIndex: 'address', key: '8', width: 150 },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right', //在右边固定不动，fixedColumn
        width: 100,
        render: () => <a>action</a>,
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
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
            <ProCard title="合并行与列" bordered headerBordered>
                <Table
                    columns={columns}
                    dataSource={data}
                    //scroll的y值仅仅是表格中数据的高度，不包括行头与pageaction
                    scroll={{ x: 1500, y: 300 }}
                />
            </ProCard>
        </Space>
    );
};
