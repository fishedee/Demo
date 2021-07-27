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
    //ProLayout使用前缀匹配的原则来匹配哪个菜单
    routes: [
        {
            extact: true,
            //不要定义为/umi路径，因为/umi/admin既匹配/umi/，也匹配/umi/admin，就会造成两个菜单项都点亮了
            path: '/welcome', //定义path
            name: '欢迎', //定义标题
            icon: <SmileOutlined />, //定义图标
        },
        {
            path: '/admin',
            name: '管理页',
            icon: <CrownOutlined />,
            routes: [
                {
                    path: '/admin/sub-page1',
                    name: '一级页面',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/admin/sub-page2',
                    name: '二级页面',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/admin/sub-page3',
                    name: '三级页面',
                    icon: <CrownOutlined />,
                },
            ],
        },
        {
            path: '/user',
            name: '用户管理页',
            icon: <SmileOutlined />,
            //把底层的隐藏掉
            //hideChildrenInMenu:true,
            routes: [
                {
                    path: '/user/add',
                    name: '添加用户',
                    hideInMenu: true,
                    icon: <CrownOutlined />,
                },
                {
                    path: '/user/view/:userId',
                    name: '编辑用户',
                    hideInMenu: true,
                    icon: <CrownOutlined />,
                },
            ],
        },
    ],
};
