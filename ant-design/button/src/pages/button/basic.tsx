import { Button, Dropdown, Menu, Space } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined } from '@ant-design/icons';
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
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                </Space>
            </ProCard>
            <ProCard title="图标与形状" bordered headerBordered>
                <Space size={10}>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />} //带图标的按钮
                    >
                        Search
                    </Button>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<SearchOutlined />} //带图标的按钮
                    >
                        Search
                    </Button>
                    <Button
                        icon={<SearchOutlined />} //带图标的按钮
                    />
                    <Button
                        shape="circle"
                        icon={<SearchOutlined />} //带图标的按钮
                    />
                    <Button
                        shape="round"
                        icon={<SearchOutlined />} //带图标的按钮
                    />
                </Space>
            </ProCard>
            <ProCard title="加载中" bordered headerBordered>
                <Space size={10}>
                    <Button
                        type="primary"
                        loading={true}
                        icon={<SearchOutlined />} //带图标的按钮
                    >
                        Search
                    </Button>
                </Space>
            </ProCard>
            <ProCard title="下拉多按钮" bordered headerBordered>
                <Space size={10}>
                    <Dropdown.Button
                        overlay={
                            <Menu>
                                <Menu.Item key="1">1st item</Menu.Item>
                                <Menu.Item key="2">2nd item</Menu.Item>
                                <Menu.Item key="3">3rd item</Menu.Item>
                            </Menu>
                        }
                    >
                        Actions
                    </Dropdown.Button>
                    <Dropdown.Button
                        type="primary"
                        overlay={
                            <Menu>
                                <Menu.Item key="1">1st item</Menu.Item>
                                <Menu.Item key="2">2nd item</Menu.Item>
                                <Menu.Item key="3">3rd item</Menu.Item>
                            </Menu>
                        }
                    />
                </Space>
            </ProCard>
        </Space>
    );
};
