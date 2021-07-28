import { Button, Dropdown, Menu, Space, Divider } from 'antd';
import ProCard from '@ant-design/pro-card';
import {
    SearchOutlined,
    LikeOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';

//注意这个是来自于pro-card的，不是antd的
const { Statistic, Operation } = StatisticCard;
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
            <StatisticCard.Group
                //StatisticCard.Group 就是ProCard
                direction={'row'}
            >
                <StatisticCard
                    statistic={{
                        title: '总流量(人次)',
                        value: 601986875,
                    }}
                />
                <Divider
                    //FIXME，Divider无法显示出来
                    type={'vertical'}
                />
                <StatisticCard
                    statistic={{
                        title: '付费流量',
                        value: 3701928,
                        description: <Statistic title="占比" value="61.5%" />,
                    }}
                    chart={
                        <img
                            src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                            alt="百分比"
                            width="100%"
                        />
                    }
                    chartPlacement="left"
                />
                <Divider type={'vertical'} />
                <StatisticCard
                    statistic={{
                        title: '免费流量',
                        value: 1806062,
                        description: <Statistic title="占比" value="38.5%" />,
                    }}
                    chart={
                        <img
                            src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                            alt="百分比"
                            width="100%"
                        />
                    }
                    chartPlacement="left"
                />
            </StatisticCard.Group>

            <StatisticCard.Group
                //标题信息
                title="核心指标"
                direction={'row'}
            >
                <StatisticCard
                    statistic={{
                        title: '今日UV',
                        tip: '供应商信息',
                        value: 79,
                        precision: 2,
                    }}
                />
                <Divider type={'vertical'} />
                <StatisticCard
                    statistic={{
                        title: '冻结金额',
                        value: 112893,
                        precision: 2,
                        suffix: '元',
                    }}
                />
                <Divider type={'vertical'} />
                <StatisticCard
                    statistic={{
                        title: '信息完整度',
                        value: 92,
                        suffix: '/ 100',
                    }}
                />
                <StatisticCard
                    statistic={{
                        title: '冻结金额',
                        value: 112893,
                        precision: 2,
                        suffix: '元',
                    }}
                />
            </StatisticCard.Group>
            <StatisticCard.Group>
                <StatisticCard
                    statistic={{
                        title: '服务网格数',
                        value: 500,
                    }}
                />
                <Operation
                //关键是这个的用法，替换Divider
                >
                    =
                </Operation>
                <StatisticCard
                    statistic={{
                        title: '未发布',
                        value: 234,
                    }}
                />
                <Operation>+</Operation>
                <StatisticCard
                    statistic={{
                        title: '发布中',
                        value: 112,
                    }}
                />
                <Operation>+</Operation>
                <StatisticCard
                    statistic={{
                        title: '已发布',
                        value: 255,
                    }}
                />
            </StatisticCard.Group>
        </Space>
    );
};
