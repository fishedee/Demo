import { Button, Dropdown, Menu, Space, Tag, Table } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    //第5行，该列不显示，因为被第1列合并了，所以设置colSpan为0
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string, row: any, index: number) => {
            //前4行
            if (index < 4) {
                return <a>{text}</a>;
            }
            //第5行
            //render不仅可以返回ReactNode，还可以返回object
            //children是ReactNode，props是单元格属性，代表合并5列
            return {
                children: <a>{text}</a>,
                props: {
                    colSpan: 5,
                },
            };
        },
    },
    {
        title: 'Age',
        dataIndex: 'age',
        render: renderContent,
    },
    {
        title: 'Home phone',
        //列头合并两列
        colSpan: 2,
        dataIndex: 'tel',
        render: (value: string, row: any, index: number) => {
            const obj = {
                children: value,
                props: {},
            };
            //第3行，跨2个行
            if (index === 2) {
                obj.props.rowSpan = 2;
            }
            //第4行，不显示行，被第3行合并了，所以设置rowSpan为0
            if (index === 3) {
                obj.props.rowSpan = 0;
            }
            //第5行，该列不显示，因为被第1列合并了，所以设置colSpan为0
            if (index === 4) {
                obj.props.colSpan = 0;
            }
            return obj;
        },
    },
    {
        title: 'Phone',
        //因为前一列合并了，所以这里要设置colSpan为0，取消显示列头
        colSpan: 0,
        dataIndex: 'phone',
        render: renderContent,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        render: renderContent,
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        tel: '0571-22098909',
        phone: 18889898989,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        tel: '0571-22098333',
        phone: 18889898888,
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'Jake White',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Dublin No. 2 Lake Park',
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
            <ProCard title="合并行与列" bordered headerBordered>
                <Table columns={columns} dataSource={data} />
            </ProCard>
        </Space>
    );
};
