import styles from './index.less';
import { history } from 'umi';

export default function CatPage(props) {
  return (
    <div>
      <h1>猫<a onClick={()=>{history.goBack()}}>返回</a></h1>
    </div>
  );
}
