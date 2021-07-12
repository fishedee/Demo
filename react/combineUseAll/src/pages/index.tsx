import styles from './index.less';
import { Link } from 'umi';

export default function IndexPage() {
    return (
        <div>
            <h1 className={styles.title}>主页</h1>
            <div>
                <Link to={'/myUse'}>useState与useEffect组合自定义Hook测试</Link>
            </div>
            <div>
                <Link to={'/myUse2'}>
                    useState与useEffect组合自定义Hook测试2
                </Link>
            </div>
        </div>
    );
}
