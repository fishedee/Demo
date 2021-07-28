import MyPageContainer from '@/components/MyPageContainer';
import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    return (
        <MyPageContainer title={'用户列表页面'} hiddenBack={true}>
            <h1>{'列表页面'}</h1>
            <Link to="/user/admin/detail">添加用户</Link>
            <br />
            <Link to="/user/admin/detail?id=1">编辑用户</Link>
        </MyPageContainer>
    );
};
