import { Button, Dropdown, Menu, Space } from 'antd';
import ProCard from '@ant-design/pro-card';
import {
    SearchOutlined,
    LikeOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';
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
            <ProCard
                title="title，extra，statistic与chart"
                bordered
                headerBordered
            >
                <Space size={20}>
                    <StatisticCard
                        //标题
                        title={'部门'}
                        //右上角内容
                        extra={<EllipsisOutlined />}
                        //主体统计信息
                        statistic={{
                            value: 1102893,
                            prefix: '¥',
                        }}
                        //主体的图表
                        chart={
                            <>
                                <img
                                    src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg"
                                    alt="chart"
                                    width="100%"
                                />
                            </>
                        }
                        style={{ width: 268 }}
                    />
                </Space>
            </ProCard>
            <ProCard title="tip，无statistic" bordered headerBordered>
                <Space size={20}>
                    <StatisticCard
                        title="大盘趋势"
                        //标题的提示信息
                        tip="大盘说明"
                        style={{ maxWidth: 480 }}
                        extra={<EllipsisOutlined />}
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
                                alt="柱状图"
                                width="100%"
                            />
                        }
                    />
                </Space>
            </ProCard>
            <ProCard title="footer" bordered headerBordered>
                <Space size={20}>
                    <StatisticCard
                        title="整体流量评分"
                        extra={<EllipsisOutlined />}
                        statistic={{
                            value: 86.2,
                            suffix: '分',
                        }}
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                                width="100%"
                                alt="进度条"
                            />
                        }
                        //图表下面的footer
                        footer={
                            <>
                                <Statistic
                                    value={15.1}
                                    title="累计注册数"
                                    suffix="万"
                                    layout="horizontal"
                                />
                                <Statistic
                                    value={15.1}
                                    title="本月注册数"
                                    suffix="万"
                                    layout="horizontal"
                                />
                            </>
                        }
                        style={{ width: 250 }}
                    />
                </Space>
            </ProCard>
            <ProCard title="children嵌套StatisticCard" bordered headerBordered>
                <Space size={20}>
                    <StatisticCard
                        title={'财年总收入'}
                        statistic={{
                            value: 601987768,
                            description: (
                                <Statistic
                                    title="日同比"
                                    value="6.15%"
                                    trend="up"
                                />
                            ),
                        }}
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                                alt="折线图"
                                width="100%"
                            />
                        }
                    >
                        <Statistic
                            //这个就是图表与footer之间嵌套的内容
                            title="大盘总收入"
                            value={1982312}
                            layout="vertical"
                            description={
                                <Statistic
                                    title="日同比"
                                    value="6.15%"
                                    trend="down"
                                />
                            }
                        />
                    </StatisticCard>
                </Space>
            </ProCard>
            <ProCard title="chartPlacement" bordered headerBordered>
                <Space size={20}>
                    <StatisticCard
                        statistic={{
                            title: '付费流量',
                            value: 3701928,
                            description: (
                                <Statistic title="占比" value="61.5%" />
                            ),
                        }}
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                                alt="百分比"
                                width="100%"
                            />
                        }
                        //将图表放在统计信息的左边
                        chartPlacement="left"
                    />
                </Space>
            </ProCard>
        </Space>
    );
};
