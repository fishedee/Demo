import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    //hash路由
    history: {
        type: 'hash',
    },

    //layout插件只能支持声明方式路由，不支持约定方式路由
    layout: {
        // 支持任何不需要 dom 的
        // https://procomponents.ant.design/components/layout#prolayout
        name: 'Remax',
        locale: true,
        layout: 'side',
    },
    //打开locale
    locale: { antd: true },

    routes: [
        { name: '首页', path: '/', component: '@/pages/index' },
        { name: 'umi', path: '/umi', component: '@/pages/umi/index' },
    ],

    //https://umijs.org/zh-CN/plugins/plugin-antd
    //紧凑主题，或者暗黑主题
    antd: {
        //dark: true,
        compact: true,
    },
    fastRefresh: {},
});
