import MyPageContainer from '@/components/MyPageContainer';
import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    return (
        <MyPageContainer title={'单位管理页面'} hiddenBack={true}>
            <h1>{'列表页面'}</h1>
        </MyPageContainer>
    );
};
