import { Space, List, Avatar } from 'antd';
import ProCard from '@ant-design/pro-card';
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

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
            <ProCard title="basic" bordered headerBordered>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            //右侧的actions
                            actions={[
                                <a key="list-loadmore-edit">edit</a>,
                                <a key="list-loadmore-more">more</a>,
                            ]}
                            //右侧的extra
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                //头像
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                //标题
                                title={
                                    <a href="https://ant.design">
                                        {item.title}
                                    </a>
                                }
                                //描述
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div
                            //children的内容
                            >
                                content
                            </div>
                        </List.Item>
                    )}
                />
            </ProCard>
        </Space>
    );
};
