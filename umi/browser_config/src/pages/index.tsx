import styles from './index.less';
import { history } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <h2><a onClick={()=>{history.push("/dog")}}>Go MyDog</a></h2>
      <h2><a onClick={()=>{history.push("/cat")}}>Go MyCat</a></h2>
    </div>
  );
}
