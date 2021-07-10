import styles from './index.less';
import { history } from 'umi';
import { useCallback } from 'react';

export default function IndexPage() {
  let goBack = useCallback(()=>{
    history.goBack();
  },[]);
  return (
    <div>
      <h1 className={styles.title}>我是猫</h1>
      <div><a onClick={goBack}>返回</a></div>
    </div>
  );
}
