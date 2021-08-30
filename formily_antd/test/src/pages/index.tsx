import styles from './index.less';
import { Link } from 'umi';
//注入antd的样式
import 'antd/dist/antd.css';

export default function IndexPage() {
    return (
        <div>
            <h1 className={styles.title}>主页</h1>
        </div>
    );
}
