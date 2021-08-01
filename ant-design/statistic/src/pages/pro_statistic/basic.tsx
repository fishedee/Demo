import { Button, Dropdown, Menu, Space } from 'antd';
import ProCard from '@ant-design/pro-card';
import { SearchOutlined, LikeOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';

//注意这个是来自于pro-card的，不是antd的
const { Statistic } = StatisticCard;
const imgStyle = {
    display: 'block',
    width: 42,
    height: 42,
};
export default () => {
    return (
        <Space
            style={{
                background: 'rgb(240, 242, 245)',
                padding: '20px',
                display: 'flex',
            }}
            direction="vertical"
            size={20}
        >
            <ProCard title="指标默认是横放的" bordered headerBordered>
                <Space
                    //value可以是number，也可以是string
                    //字符串的话，精度就不起作用了
                    size={20}
                >
                    <Statistic
                        title="实际完成度"
                        value={82.3}
                        prefix={<LikeOutlined />}
                    />
                    <Statistic title="实际完成度" value={'82'} suffix="/ 100" />

                    <Statistic title="当前目标" value={6000} precision={2} />
                    <Statistic title="当前目标" value={'¥6000'} precision={2} />
                </Space>
            </ProCard>
            <ProCard title="竖放" bordered headerBordered>
                <Space size={20}>
                    <Statistic
                        value={15.1}
                        title="累计注册数"
                        suffix="万"
                        layout="vertical"
                    />
                    <Statistic
                        value={15.1}
                        title="本月注册数"
                        suffix="万"
                        layout="vertical"
                    />
                </Space>
            </ProCard>
            <ProCard title="趋势" bordered headerBordered>
                <Space size={20}>
                    <Statistic
                        layout="vertical"
                        title="日同比"
                        value="6.15%"
                        trend="up"
                    />
                    <Statistic
                        layout="vertical"
                        title="日同比"
                        value="3.85%"
                        trend="down"
                    />
                    ,
                </Space>
            </ProCard>
            <ProCard title="状态" bordered headerBordered>
                <Space size={20}>
                    <Statistic
                        layout="vertical"
                        title="日同比"
                        value="6.15%"
                        status="success"
                    />
                    <Statistic
                        layout="vertical"
                        title="日同比"
                        value="-3.85%"
                        status="error"
                    />
                    ,
                </Space>
            </ProCard>
            <ProCard title="图标" bordered headerBordered>
                <Space size={20}>
                    <Statistic
                        layout="vertical"
                        title={'支付金额'}
                        value={2176}
                        icon={
                            <img
                                style={imgStyle}
                                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                                alt="icon"
                            />
                        }
                    />
                    <Statistic
                        layout="vertical"
                        title={'访客数'}
                        value={475}
                        icon={
                            <img
                                style={imgStyle}
                                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                                alt="icon"
                            />
                        }
                    />
                </Space>
            </ProCard>
            <ProCard title="描述" bordered headerBordered>
                <Space size={20}>
                    <Statistic
                        layout="vertical"
                        title={'支付金额'}
                        value={2176}
                        description={
                            <Space direction="vertical">
                                <Statistic title="实际完成度" value="82.3%" />
                                <Statistic title="当前目标" value="¥6000" />
                            </Space>
                        }
                    />
                </Space>
            </ProCard>
        </Space>
    );
};
