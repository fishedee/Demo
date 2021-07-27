import { Link, useLocation, useRouteMatch } from 'umi';

export default () => {
    return (
        <div>
            <h1>{'列表页面'}</h1>
            <Link to="/user/add">添加用户</Link>
            <br />
            <Link to="/user/view/1">编辑用户</Link>
        </div>
    );
};
