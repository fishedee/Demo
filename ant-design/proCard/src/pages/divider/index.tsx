import React, { useState } from 'react';
import { Statistic } from 'antd';
import ProCard from '@ant-design/pro-card';

const { Divider } = ProCard;

export default () => {
    //使用ProCard.Group的话，分割的宽度更为准确，
    //其实与ProCard也区别不大，可以直接用
    return (
        <div
            style={{
                background: 'rgb(240, 242, 245)',
                padding: '20px',
            }}
        >
            <ProCard.Group title="核心指标" direction={'row'}>
                <ProCard>
                    <Statistic title="今日UV" value={79.0} precision={2} />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                    <Statistic
                        title="冻结金额"
                        value={112893.0}
                        precision={2}
                    />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                    <Statistic title="信息完整度" value={93} suffix="/ 100" />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                    <Statistic title="冻结金额" value={112893.0} />
                </ProCard>
            </ProCard.Group>

            <ProCard
                title="核心指标"
                direction={'row'}
                style={{ marginTop: '10px' }}
            >
                <ProCard>
                    <Statistic title="今日UV" value={79.0} precision={2} />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                    <Statistic
                        title="冻结金额"
                        value={112893.0}
                        precision={2}
                    />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                    <Statistic title="信息完整度" value={93} suffix="/ 100" />
                </ProCard>
                <Divider type={'vertical'} />
                <ProCard>
                    <Statistic title="冻结金额" value={112893.0} />
                </ProCard>
            </ProCard>
        </div>
    );
};
