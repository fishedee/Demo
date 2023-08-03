import { Link, Outlet } from 'umi';
import styles from './index.less';
import {MainPanel} from 'mylib/MainPanel';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">sdHome</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
      <MainPanel title={"fish"}/>
      <Outlet />
    </div>
  );
}
