import styles from './index.less';
import MyPackage from 'my_package';

export default function IndexPage() {
  console.log(MyPackage());
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
