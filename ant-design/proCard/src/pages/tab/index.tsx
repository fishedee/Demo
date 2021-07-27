import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
    const [tab, setTab] = useState('tab2');

    return (
        <div style={{ background: 'rgb(240, 242, 245)', padding: '20px' }}>
            <ProCard
                tabs={{
                    tabPosition: 'top',
                }}
            >
                <ProCard.TabPane key="tab1" tab="产品一">
                    内容一
                </ProCard.TabPane>
                <ProCard.TabPane key="tab2" tab="产品二">
                    内容二
                </ProCard.TabPane>
            </ProCard>

            <ProCard
                style={{ marginTop: '10px' }}
                tabs={{
                    //可以为card的展示方式
                    type: 'card',
                    //可以为左侧显示模式
                    tabPosition: 'left',
                    //可以为受控模式
                    activeKey: tab,
                    onChange: (key) => {
                        setTab(key);
                    },
                }}
            >
                <ProCard.TabPane key="tab1" tab="产品一">
                    内容一
                </ProCard.TabPane>
                <ProCard.TabPane key="tab2" tab="产品二">
                    内容二
                </ProCard.TabPane>
            </ProCard>
        </div>
    );
};
