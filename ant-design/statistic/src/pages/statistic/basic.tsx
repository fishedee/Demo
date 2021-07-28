import { Button, Dropdown, Menu, Space, Statistic } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined, LikeOutlined } from '@ant-design/icons';
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
            <ProCard title="title，value与precision" bordered headerBordered>
                <Space size={20}>
                    <Statistic title="Active Users" value={112893} />
                    <Statistic
                        title="Account Balance (CNY)"
                        value={112893}
                        precision={2}
                    />
                </Space>
            </ProCard>
            <ProCard title="prefix与suffix" bordered headerBordered>
                <Space size={20}>
                    <Statistic
                        title="Feedback"
                        value={1128}
                        prefix={<LikeOutlined />}
                    />
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Space>
            </ProCard>
        </Space>
    );
};
