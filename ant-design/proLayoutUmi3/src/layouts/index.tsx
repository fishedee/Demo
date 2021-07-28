import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import route from './route';
import { useHistory, useLocation } from 'umi';
import { Fragment, useState } from 'react';
import { PageActionContext } from '@/components/MyPageContainer';

export default (props) => {
    const history = useHistory();
    const location = useLocation();
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
    const [state, setState] = useState(0);
    return (
        <PageActionContext.Provider
            value={{
                refresh: () => {
                    setState(state + 1);
                },
            }}
        >
            <div
                id="test-pro-layout"
                style={{
                    height: '100vh',
                }}
            >
                <ProLayout
                    //定义左侧菜单的路由
                    route={route}
                    //使用location来active对应的menu
                    location={{
                        pathname: location.pathname,
                    }}
                    //内容部分的底面水印
                    waterMarkProps={{
                        content: 'Pro Layout',
                    }}
                    //顶部标题
                    title="Remax"
                    //顶部logo
                    logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
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
                                    src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
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
                                history.push(item.path || '/welcome');
                            }}
                        >
                            {dom}
                        </a>
                    )}
                    //关闭breadCrumb
                    breadcrumbRender={(route) => {
                        return [];
                    }}
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
                >
                    <Fragment key={state}>{props.children}</Fragment>
                </ProLayout>
            </div>
        </PageActionContext.Provider>
    );
};
