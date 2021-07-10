import styles from './index.less';
import { history } from 'umi';

export default function DogPage(props) {
  return (
    <div>
      <h1>狗<a onClick={()=>{history.goBack()}}>返回</a></h1>
    </div>
  );
}
