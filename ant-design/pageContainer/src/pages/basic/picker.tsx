import { Table, Popconfirm, Button } from 'antd';
import { useState } from 'react';
import { DatePicker, message } from 'antd';

const ProductList = () => {
    const [date, setDate] = useState(null);
    const handleChange = (value) => {
        message.info(
            `您选择的日期是: ${
                value ? value.format('YYYY年MM月DD日') : '未选择'
            }`,
        );
        setDate(value);
    };
    return (
        <div>
            <DatePicker onChange={handleChange} />
        </div>
    );
};

export default ProductList;
