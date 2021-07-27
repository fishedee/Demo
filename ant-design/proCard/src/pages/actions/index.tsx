import React from 'react';
import ProCard from '@ant-design/pro-card';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export default () => {
    return (
        <div style={{ background: 'rgb(240, 242, 245)', padding: '20px' }}>
            <ProCard
                title="Actions 操作项"
                style={{ maxWidth: 300 }}
                //actions是设置项的描述，会自带垂直的分割线
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <div>Card content</div>
                <div>Card content</div>
                <div>Card content</div>
            </ProCard>
        </div>
    );
};
