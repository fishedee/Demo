import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';

const Layout: React.FC<any> = (props) => {
    //content是页面Header的内容
    //tabList是可选的tab列表
    //extra是右上角的内容
    //footer是底部数据，以fixed的形式存在
    return (
        <PageContainer
            title="我是标题"
            content="欢迎使用 ProLayout 组件"
            extraContent="我是额外内容"
            tabList={[
                {
                    tab: '基本信息',
                    key: 'base',
                },
                {
                    tab: '详细信息',
                    key: 'info',
                },
            ]}
            extra={[
                <Button key="3">操作</Button>,
                <Button key="2">操作</Button>,
                <Button key="1" type="primary">
                    主操作
                </Button>,
            ]}
            footer={[
                <Button key="rest">重置</Button>,
                <Button key="submit" type="primary">
                    提交
                </Button>,
            ]}
        >
            {props.children}
        </PageContainer>
    );
};

export default Layout;
