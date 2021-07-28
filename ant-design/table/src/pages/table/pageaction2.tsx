import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setCurrentPageSize] = useState(10);
    const setCurrentPageCallback = (current: number) => {
        setTimeout(() => {
            setCurrentPage(current);
        }, 100);
    };
    const onShowSizeChange = (current: number, size: number) => {
        setTimeout(() => {
            setCurrentPage(current);
            setCurrentPageSize(size);
        }, 100);
    };
    console.log(currentPage, pageSize);
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
                    //只传入前10条数据，后端分页
                    //dataSource={data.slice(0, 10)}
                    //前端分页，就是传入整个data就可以了
                    dataSource={data}
                    //不显式分页器，无论数据有多少，都在一页里面显式完毕
                    pagination={{
                        current: currentPage, //当前页是哪个页，从1开始计数
                        onChange: setCurrentPageCallback, //当前页的用户触发更改
                        total: data.length, //传入的data总数
                        showTotal: (total, range) => `共${total}条`, //显式有多少条总数
                        showQuickJumper: true, //快速跳页
                        showSizeChanger: true,
                        pageSize: pageSize,
                        onShowSizeChange: onShowSizeChange,
                    }}
                />
            </ProCard>
        </Space>
    );
};
