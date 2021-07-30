import { Progress, Space, Tag } from 'antd';
import ProCard from '@ant-design/pro-card';
import {
    SearchOutlined,
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
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
            <ProCard title="precent" bordered headerBordered direction="column">
                <Progress
                    percent={30} //默认的Progress是block的display
                />
                <Progress
                    percent={50}
                    showInfo={false} //不显示precent值
                />
                <Progress percent={50} status="active" />
                <Progress
                    percent={70}
                    status="exception" //exception的时候就是红色，不显示precent值
                />
                <Progress
                    percent={100} //100的时候默认就是绿色，不显示precent值
                />
            </ProCard>
            <ProCard title="type" bordered headerBordered>
                <Space size={10}>
                    <Progress
                        type="circle" //圆形
                        percent={30} //圆形的Progress是inline-block的display
                    />
                    <Progress type="circle" percent={50} showInfo={false} />
                    <Progress type="circle" percent={50} status="active" />
                    <Progress type="circle" percent={70} status="exception" />
                    <Progress type="circle" percent={100} />
                </Space>
            </ProCard>
            <ProCard title="format" bordered headerBordered>
                <Progress
                    percent={30}
                    format={(value) => {
                        return value + '天';
                    }}
                />
                <Progress
                    percent={100}
                    format={(value) => {
                        return 'Done';
                    }}
                />
                <Progress
                    type="circle"
                    percent={30}
                    format={(value) => {
                        return value + '天';
                    }}
                />
                <Progress
                    type="circle"
                    percent={100}
                    format={(value) => {
                        return 'Done';
                    }}
                />
            </ProCard>
        </Space>
    );
};
