import styles from './index.less';
import Hello from 'my_package';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Hello/>
    </div>
  );
}
