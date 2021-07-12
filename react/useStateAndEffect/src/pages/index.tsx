import styles from './index.less';
import { Link } from 'umi';

export default function IndexPage() {
    return (
        <div>
            <h1 className={styles.title}>主页</h1>
            <div>
                <Link to={'/state'}>useState测试</Link>
            </div>
            <div>
                <Link to={'/effect'}>useEffect测试</Link>
            </div>
            <div>
                <Link to={'/reducer'}>useReducer测试</Link>
            </div>
        </div>
    );
}
