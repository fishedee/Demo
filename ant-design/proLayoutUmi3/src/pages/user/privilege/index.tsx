import MyPageContainer from '@/components/MyPageContainer';
import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    return (
        <MyPageContainer title={'权限列表页面'} hiddenBack={true}>
            <h1>{'列表页面'}</h1>
            <Link to="/user/privilege/detail">修改权限</Link>
        </MyPageContainer>
    );
};
