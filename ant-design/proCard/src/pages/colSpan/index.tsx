import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
    return (
        <div style={{ background: 'rgb(240, 242, 245)', padding: '20px' }}>
            <ProCard
                direction="column" //使用了flex-direction
                ghost
                gutter={[0, 8]} //使用了flex的gap
            >
                <ProCard
                    layout="center" //justify-content为center，以及align-items也为center，效果就是上下左右都是中间
                    bordered //四周有边框
                >
                    colSpan - 24
                </ProCard>
                <ProCard
                    colSpan={12} //colSpan设置了宽度的比例，而且设置了flex-shrink为0，不能收缩
                    layout="center"
                    bordered
                >
                    colSpan - 12
                </ProCard>
                <ProCard colSpan={8} layout="center" bordered>
                    colSpan - 8
                </ProCard>
                <ProCard colSpan={0} layout="center" bordered>
                    colSpan - 0
                </ProCard>
            </ProCard>
            <ProCard gutter={8} title="24栅格" style={{ marginTop: 8 }}>
                <ProCard colSpan={12} layout="center" bordered>
                    colSpan-12
                </ProCard>
                <ProCard colSpan={6} layout="center" bordered>
                    colSpan-6
                </ProCard>
                <ProCard colSpan={6} layout="center" bordered>
                    colSpan-6
                </ProCard>
            </ProCard>
            <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
                <ProCard colSpan="200px" layout="center" bordered>
                    colSpan - 200px
                </ProCard>
                <ProCard layout="center" bordered>
                    Auto
                </ProCard>
            </ProCard>
            <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
                <ProCard bordered layout="center">
                    Auto
                </ProCard>
                <ProCard
                    colSpan="30%" //colSpan可以为单独的比例，而不是数字
                    bordered
                >
                    colSpan - 30%
                </ProCard>
            </ProCard>
        </div>
    );
};
