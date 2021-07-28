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
            path: '/welcome', //定义path
            name: '欢迎', //定义标题
            icon: <SmileOutlined />, //定义图标
        },
        {
            path: '/item',
            name: '商品管理',
            icon: <CrownOutlined />,
            routes: [
                {
                    path: '/item/unit',
                    name: '单位管理',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/item/item',
                    name: '商品管理',
                    icon: <CrownOutlined />,
                },
            ],
        },
        {
            path: '/user',
            name: '用户管理',
            icon: <SmileOutlined />,
            routes: [
                {
                    path: '/user/admin',
                    name: '用户管理',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/user/privilege',
                    name: '权限管理',
                    icon: <CrownOutlined />,
                },
            ],
        },
    ],
};
