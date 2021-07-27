import { PageContainer } from '@ant-design/pro-layout';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { genBreadcrumbProps } from '@ant-design/pro-layout/lib/utils/getBreadcrumbProps';
import { useHistory, useLocation } from 'umi';

const content = (
    <Descriptions size="small" column={2}>
        <Descriptions.Item label="创建人">张三</Descriptions.Item>
        <Descriptions.Item label="联系方式">
            <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="备注">
            中国浙江省杭州市西湖区古翠路
        </Descriptions.Item>
    </Descriptions>
);

const AdminLayout: React.FC<any> = (props) => {
    const location = useLocation();
    const history = useHistory();
    //ProLayout会自动计算BreadCump和title，传递给PageContainer
    return (
        <PageContainer
            //使用PathName作为tab的activeKey
            tabActiveKey={location.pathname}
            //定义每个子页面对应的key
            tabList={[
                {
                    tab: '子页面1',
                    key: '/admin/sub-page1',
                },
                {
                    tab: '子页面2',
                    key: '/admin/sub-page2',
                },
                {
                    tab: '子页面3',
                    key: '/admin/sub-page3',
                },
            ]}
            //标签页切换的时候，使用history切换页面
            onTabChange={(value) => {
                history.replace(value);
            }}
            //PageContainer内容页的信息
            content={content}
            //PageContainer内容页的右上角
            extraContent={
                <Space size={24}>
                    <Statistic
                        title="Feedback"
                        value={1128}
                        prefix={<LikeOutlined />}
                    />
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Space>
            }
            //header的顶部内容
            extra={[
                <Button key="3">操作</Button>,
                <Button key="2">操作</Button>,
                <Button key="1" type="primary">
                    主操作
                </Button>,
            ]}
        >
            {props.children}
        </PageContainer>
    );
};

export default AdminLayout;
