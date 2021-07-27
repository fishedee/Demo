import React, { useState } from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, {
    PageContainer,
    SettingDrawer,
    DefaultFooter,
} from '@ant-design/pro-layout';
import route from './route';

const content = (
    <Descriptions size="small" column={2}>
        <Descriptions.Item label="创建人">张三</Descriptions.Item>
        <Descriptions.Item label="联系方式">
            <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="备注">
            中国浙江省杭州市西湖区古翠路
        </Descriptions.Item>
    </Descriptions>
);

export default () => {
    const mixModeSetting = {
        fixSiderbar: true, //可调的左侧群
        navTheme: 'light', //light的主题模式
        primaryColor: '#1890ff', //菜单主题色
        layout: 'mix', //混合布局，左侧与顶端都是
        contentWidth: 'Fluid', //流式内容布局，宽度总是会自动调整
        splitMenus: true, //分割菜单，一级菜单在顶部，其他菜单在左侧
        fixedHeader: false,
        menuHeaderRender: false, //不显示左侧的菜单栏logo
    };
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
    });
    const [pathname, setPathname] = useState('/welcome');
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                //定义左侧菜单的路由
                route={route}
                //定义当前页面的location
                location={{
                    pathname,
                }}
                //内容部分的底面水印
                waterMarkProps={{
                    content: 'Pro Layout',
                }}
                //顶部标题
                title="Remax"
                //顶部logo
                logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
                //左侧菜单栏顶部的header
                menuHeaderRender={(logo, title) => (
                    <div
                        id="customize_menu_header"
                        onClick={() => {
                            window.open('https://remaxjs.org/');
                        }}
                    >
                        {logo}
                        {title}
                    </div>
                )}
                //左侧菜单栏底部的footer
                menuFooterRender={(props) => {
                    return (
                        <a
                            style={{
                                lineHeight: '48rpx',
                                display: 'flex',
                                height: 48,
                                color: 'rgba(255, 255, 255, 0.65)',
                                alignItems: 'center',
                            }}
                            href="https://preview.pro.ant.design/dashboard/analysis"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                alt="pro-logo"
                                src="https://procomponents.ant.design/favicon.ico"
                                style={{
                                    width: 16,
                                    height: 16,
                                    margin: '0 16px',
                                    marginRight: 10,
                                }}
                            />
                            {!props?.collapsed && //根据是否折叠来显示Preview Remax
                                'Preview Remax'}
                        </a>
                    );
                }}
                //左侧菜单栏的每个菜单项的渲染
                menuItemRender={(item, dom) => (
                    //每个表单项的包装器，可以设置点击时的触发行为
                    <a
                        onClick={() => {
                            setPathname(item.path || '/welcome');
                        }}
                    >
                        {dom}
                    </a>
                )}
                //右侧内容的展示
                rightContentRender={() => (
                    <div>
                        <Avatar
                            shape="square"
                            size="small"
                            icon={<UserOutlined />}
                        />
                    </div>
                )}
                //内容的页脚
                footerRender={() => (
                    <DefaultFooter
                        links={[
                            {
                                key: 'test',
                                title: 'layout',
                                href: 'www.alipay.com',
                            },
                            {
                                key: 'test2',
                                title: 'layout2',
                                href: 'www.alipay.com',
                            },
                        ]}
                        copyright="这是一条测试文案"
                    />
                )}
                //是否有菜单的可选收缩按钮
                {...mixModeSetting}
                //可选项
                //{...settings}
            >
                <PageContainer
                    //ProLayout会自动计算BreadCump和title，传递给PageContainer
                    tabList={[
                        {
                            tab: '基本信息',
                            key: 'base',
                        },
                        {
                            tab: '详细信息',
                            key: 'info',
                        },
                    ]}
                    //PageContainer内容页的信息
                    content={content}
                    //PageContainer内容页的右上角
                    extraContent={
                        <Space size={24}>
                            <Statistic
                                title="Feedback"
                                value={1128}
                                prefix={<LikeOutlined />}
                            />
                            <Statistic
                                title="Unmerged"
                                value={93}
                                suffix="/ 100"
                            />
                        </Space>
                    }
                    //header的顶部内容
                    extra={[
                        <Button key="3">操作</Button>,
                        <Button key="2">操作</Button>,
                        <Button key="1" type="primary">
                            主操作
                        </Button>,
                    ]}
                >
                    <div
                        style={{
                            height: '120vh',
                        }}
                    >
                        <Result
                            status="404"
                            style={{
                                height: '100%',
                                background: '#fff',
                            }}
                            title="Hello World"
                            subTitle="Sorry, you are not authorized to access this page."
                            extra={<Button type="primary">Back Home</Button>}
                        />
                    </div>
                </PageContainer>
            </ProLayout>
            <SettingDrawer
                //浮层，用来动态调整Menu的属性
                //在实际环境不需要用
                pathname={pathname}
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams
            />
        </div>
    );
};
