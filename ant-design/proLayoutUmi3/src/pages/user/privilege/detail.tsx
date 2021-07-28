import MyPageContainer from '@/components/MyPageContainer';
import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    const location = useLocation();
    return (
        <MyPageContainer title={'修改用户权限'}>
            {'用户权限详情'}
        </MyPageContainer>
    );
};
