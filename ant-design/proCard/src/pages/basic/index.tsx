import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
    return (
        <div style={{ background: 'rgb(240, 242, 245)', padding: '20px' }}>
            <ProCard
                //ProCard默认是flex布局，不是inline-flex布局
                title="默认尺寸" //标题
                tooltip="这是提示" //标题旁边的问号，表示tooltip
                extra="extra" //右上角内容
                style={{ maxWidth: 300 }}
            >
                <div>Card content</div>
                <div>Card content</div>
                <div>Card content</div>
            </ProCard>
            <ProCard
                title="小尺寸卡片"
                tooltip="这是提示"
                extra="extra"
                style={{ maxWidth: 300, marginTop: 24 }}
                size="small" //小号的尺寸
            >
                <div>Card content</div>
                <div>Card content</div>
                <div>Card content</div>
            </ProCard>
        </div>
    );
};
