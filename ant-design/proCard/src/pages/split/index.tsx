import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

export default () => {
    return (
        <div style={{ background: 'rgb(240, 242, 245)', padding: '20px' }}>
            <ProCard
                title="左右分栏带标题"
                extra="2019年9月28日"
                split={'horizontal'} //上下分层，水平的分界线，split的特点是，父子ProCard之间的padding消失了。子ProCard的圆角也消失了
                bordered
                headerBordered //是指header与content之间的分界线
            >
                <ProCard title="左侧详情" colSpan="50%">
                    <div style={{ height: 100 }}>左侧内容</div>
                </ProCard>
                <ProCard title="流量占用情况">
                    <div style={{ height: 100 }}>右侧内容</div>
                </ProCard>
            </ProCard>

            <ProCard split="vertical" style={{ marginTop: '10px' }}>
                <ProCard title="左侧详情" colSpan="30%">
                    左侧内容
                </ProCard>
                <ProCard title="左右分栏子卡片带标题" headerBordered>
                    <div style={{ height: 360 }}>右侧内容</div>
                </ProCard>
            </ProCard>
        </div>
    );
};
