import MyPageContainer from '@/components/MyPageContainer';
import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    return (
        <MyPageContainer title={'商品列表页面'} hiddenBack={true}>
            <h1>{'商品列表页面'}</h1>
            <Link to="/item/item/detail">添加商品</Link>
            <br />
            <Link to="/item/item/detail?id=1">编辑商品</Link>
        </MyPageContainer>
    );
};
