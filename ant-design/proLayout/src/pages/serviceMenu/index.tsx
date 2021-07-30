import React, { useRef } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import customMenuDate from './route';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    const actionRef = useRef<{
        //触发重新加载菜单
        reload: () => void;
    }>();
    return (
        <>
            <ProLayout
                style={{
                    height: '100vh',
                    border: '1px solid #ddd',
                }}
                //获取menu的action
                actionRef={actionRef}
                menu={{
                    request: async () => {
                        //菜单是异步拉取，再这里拉取
                        await waitTime(2000);
                        return customMenuDate;
                    },
                }}
                location={{
                    //当前的location
                    pathname: '/welcome/welcome',
                }}
            >
                <PageContainer
                    //ProLayout自动计算面包屑，和标题
                    content="欢迎使用"
                >
                    Hello World
                    <Button
                        style={{
                            margin: 8,
                        }}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                    >
                        刷新菜单
                    </Button>
                </PageContainer>
            </ProLayout>
        </>
    );
};
