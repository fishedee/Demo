import styles from './index.less';
import { history } from 'umi';
import { useCallback } from 'react';

export default function IndexPage() {
  let go1 = useCallback(()=>{
    history.push("/cat");
  },[]);

  //可以带上参数
  let go2 = useCallback(()=>{
    history.push({
      pathname:"/dog",
      query:{
        name:"Kate",
      },
      state:{
        count:"count",
      }
    });
  },[]);
  return (
    <div>
      <h1 className={styles.title}>我是主页</h1>
      <div><a onClick={go1}>去猫</a></div>
      <div><a onClick={go2}>去狗</a></div>
    </div>
  );
}
