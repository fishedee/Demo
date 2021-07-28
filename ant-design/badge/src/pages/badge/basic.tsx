import { Button, Dropdown, Menu, Space, Avatar, Badge } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
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
            <ProCard title="包裹组件的徽标" bordered headerBordered>
                <Space size={20}>
                    <Badge count={10}>
                        <Avatar
                            size={64}
                            shape="square"
                            icon={<UserOutlined />}
                        />
                    </Badge>
                    <Badge count={0}>
                        <Avatar
                            size={64}
                            shape="square"
                            icon={<UserOutlined />}
                        />
                    </Badge>
                    <Badge
                        count={0}
                        showZero //默认0值不显示
                    >
                        <Avatar
                            size={64}
                            shape="square"
                            icon={<UserOutlined />}
                        />
                    </Badge>
                    <Badge
                        count={100}
                        overflowCount={99} //封顶数默认为99
                    >
                        <Avatar
                            size={64}
                            shape="square"
                            icon={<UserOutlined />}
                        />
                    </Badge>
                    <Badge dot>
                        <Avatar
                            size={64}
                            shape="square"
                            icon={<UserOutlined />}
                        />
                    </Badge>
                </Space>
            </ProCard>
            <ProCard title="不包裹组件的徽标" bordered headerBordered>
                <Space size={10}>
                    <Badge count={10} />
                    <Badge count={0} showZero />
                    <Badge count={100} />
                    <Badge dot />
                </Space>
            </ProCard>
            <ProCard title="展示文本组件的徽标" bordered headerBordered>
                <Space size={10}>
                    <Badge status="success" text="Success" />
                    <Badge status="error" text="Error" />
                    <Badge status="default" text="Default" />
                    <Badge status="processing" text="Processing" />
                    <Badge status="warning" text="Warning" />
                </Space>
            </ProCard>
        </Space>
    );
};
