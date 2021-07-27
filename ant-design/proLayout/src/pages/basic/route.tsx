import React from 'react';
import {
    SmileOutlined,
    CrownOutlined,
    TabletOutlined,
    AntDesignOutlined,
} from '@ant-design/icons';

export default {
    path: '/',
    //子级的路由
    routes: [
        {
            path: '/welcome', //定义path
            name: '欢迎', //定义标题
            icon: <SmileOutlined />, //定义图标
            //component: './Welcome', //定义组件，UMI会识别到这里
        },
        {
            path: '/admin',
            name: '管理页',
            icon: <CrownOutlined />,
            access: 'canAdmin', //访问权限，不知道有啥用
            //component: './Admin',
            //子级的路由
            routes: [
                {
                    path: '/admin/sub-page1',
                    name: '一级页面',
                    icon: <CrownOutlined />,
                    //component: './Welcome',
                },
                {
                    path: '/admin/sub-page2',
                    name: '二级页面',
                    icon: <CrownOutlined />,
                    //component: './Welcome',
                },
                {
                    path: '/admin/sub-page3',
                    name: '三级页面',
                    icon: <CrownOutlined />,
                    //component: './Welcome',
                },
            ],
        },
        {
            name: '列表页',
            icon: <TabletOutlined />,
            path: '/list',
            //component: './ListTableList',
            routes: [
                {
                    path: '/list/sub-page',
                    name: '一级列表页面',
                    icon: <CrownOutlined />,
                    routes: [
                        {
                            path: 'sub-sub-page1',
                            name: '一一级列表页面',
                            icon: <CrownOutlined />,
                            //component: './Welcome',
                        },
                        {
                            path: 'sub-sub-page2',
                            name: '一二级列表页面',
                            icon: <CrownOutlined />,
                            //component: './Welcome',
                        },
                        {
                            path: 'sub-sub-page3',
                            name: '一三级列表页面',
                            icon: <CrownOutlined />,
                            //component: './Welcome',
                        },
                    ],
                },
                {
                    path: '/list/sub-page2',
                    name: '二级列表页面',
                    icon: <CrownOutlined />,
                    //component: './Welcome',
                },
                {
                    path: '/list/sub-page3',
                    name: '三级列表页面',
                    icon: <CrownOutlined />,
                    //component: './Welcome',
                },
            ],
        },
        {
            path: 'https://ant.design', //可以直接指向外链
            name: 'Ant Design 官网外链',
            icon: <AntDesignOutlined />,
        },
    ],
};
