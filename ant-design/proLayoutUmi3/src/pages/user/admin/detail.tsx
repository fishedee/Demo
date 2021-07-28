import MyPageContainer from '@/components/MyPageContainer';
import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    const location = useLocation();
    const title = location.query.id ? '编辑用户' : '添加用户';
    return <MyPageContainer title={title}>{title}</MyPageContainer>;
};
