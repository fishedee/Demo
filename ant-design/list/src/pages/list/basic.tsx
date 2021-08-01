import { Space, List } from 'antd';
import ProCard from '@ant-design/pro-card';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
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
            <ProCard title="basic" bordered headerBordered>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                        //总是用List.Item来包住
                        >
                            {item}
                        </List.Item>
                    )}
                />
            </ProCard>
        </Space>
    );
};
