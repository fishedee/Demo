import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import ProCard from '@ant-design/pro-card';
import {
    SearchOutlined,
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
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
            <ProCard title="基础" bordered headerBordered>
                <Space size={10}>
                    <Tag>Tag 1</Tag>
                    <Tag
                        closable
                        onClose={(e) => {
                            e.preventDefault();
                            console.log('close');
                        }}
                    >
                        Tag 2
                    </Tag>
                </Space>
            </ProCard>
            <ProCard title="color" bordered headerBordered>
                <Space size={10}>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="lime">lime</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                </Space>
            </ProCard>
            <ProCard title="icon" bordered headerBordered>
                <Space size={10}>
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        success
                    </Tag>
                    <Tag icon={<SyncOutlined spin />} color="processing">
                        processing
                    </Tag>
                </Space>
            </ProCard>
        </Space>
    );
};
