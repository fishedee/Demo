import { Table, Popconfirm, Button } from 'antd';
import { useState } from 'react';
import { DatePicker, message } from 'antd';

const ProductList = () => {
    const products = [{ name: 'fish' }, { name: 'cat' }];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
    ];
    return (
        <div>
            <Table dataSource={products} columns={columns} rowKey={'name'} />
        </div>
    );
};

export default ProductList;
