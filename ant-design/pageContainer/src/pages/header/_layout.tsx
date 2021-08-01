import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { genBreadcrumbProps } from '@ant-design/pro-layout/lib/utils/getBreadcrumbProps';

const Layout: React.FC<any> = (props) => {
    const [activeKey, setActiveKey] = useState('base');

    return (
        <div
            style={{
                background: '#F5F7FA',
            }}
        >
            <PageContainer
                //放在header位置
                header={{
                    title: '页面标题',
                    subTitle: '子标题',
                    tags: <Tag color="blue">Running</Tag>,
                    //ghost是让背景设置为透明
                    ghost: true,
                    //面包屑，重要的展示内容
                    breadcrumb: {
                        routes: [
                            {
                                //前端的位置，path点击以后都是可以跳转的
                                path: '/basic/picker',
                                breadcrumbName: '一级页面',
                            },
                            {
                                path: '/basic/table',
                                breadcrumbName: '二级页面',
                            },
                            {
                                //当前页面的path没有作用
                                path: '',
                                breadcrumbName: '当前页面',
                            },
                        ],
                    },
                    //右上角的展示内容
                    extra: [
                        <Button key="1">次要按钮</Button>,
                        <Button key="2">次要按钮</Button>,
                        <Button key="3" type="primary">
                            主要按钮
                        </Button>,
                        <Dropdown
                            key="dropdown"
                            trigger={['click']}
                            overlay={
                                //overlay是点击以后的展示内容
                                <Menu>
                                    <Menu.Item key="1">下拉菜单</Menu.Item>
                                    <Menu.Item key="2">下拉菜单2</Menu.Item>
                                    <Menu.Item key="3">下拉菜单3</Menu.Item>
                                </Menu>
                            }
                            //DropDown的children是它的展示方式
                        >
                            <Button key="4" style={{ padding: '0 8px' }}>
                                <EllipsisOutlined />
                            </Button>
                        </Dropdown>,
                    ],
                }}
                //在header里面有extra的话，外部的extra就不会起作用
                extra={[
                    <Button key="1">次要按钮</Button>,
                    <Button key="2">次要按钮</Button>,
                ]}
                content="欢迎使用 ProLayout 组件"
                tabActiveKey={activeKey}
                tabList={[
                    {
                        tab: '基本信息',
                        key: 'base',
                        //closeable为false就是没有关闭按钮
                        closable: false,
                    },
                    {
                        tab: '详细信息',
                        key: 'info',
                    },
                ]}
                tabProps={{
                    //tab的展示样式，这里
                    //基础样式有line、card editable-card
                    //https://ant.design/components/tabs-cn/#Tabs
                    //editable-card，表示标签页可以删除
                    type: 'editable-card',
                    //标签页有+号
                    hideAdd: false,
                    //新增与删除标签页时候的回调
                    onEdit: (e, action) => console.log(e, action),
                }}
                //标签页点击时的回调
                onTabChange={(value) => {
                    //value是标签的key
                    setActiveKey(value);
                    console.log('tab change to', value);
                }}
                footer={[
                    //底部按钮群，fixed形式，也没啥好说的
                    <Button key="3">重置</Button>,
                    <Button key="2" type="primary">
                        提交
                    </Button>,
                ]}
            >
                {props.children}
            </PageContainer>
        </div>
    );
};

export default Layout;
