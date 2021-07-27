import { useLocation, useRouteMatch } from 'umi';

export default () => {
    const routeMath = useRouteMatch();
    return <div>{'详情页面:' + routeMath.params.id}</div>;
};
