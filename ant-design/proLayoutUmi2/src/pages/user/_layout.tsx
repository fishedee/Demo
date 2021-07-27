import { PageContainer } from '@ant-design/pro-layout';

const AdminLayout: React.FC<any> = (props) => {
    return <PageContainer>{props.children}</PageContainer>;
};

export default AdminLayout;
