import React from 'react';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import route, { loopMenuItem } from './route';

export default () => (
    <ProLayout
        style={{
            height: 500,
        }}
        fixSiderbar
        location={{
            pathname: '/welcome/welcome',
        }}
        menu={{ request: async () => loopMenuItem(route) }}
    >
        <PageContainer content="欢迎使用">
            <div
                style={{
                    height: '120vh',
                }}
            >
                Hello World
            </div>
        </PageContainer>
    </ProLayout>
);
