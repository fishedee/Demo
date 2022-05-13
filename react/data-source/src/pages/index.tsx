import styles from './index.less';
import {Input} from 'antd';
import { useState } from 'react';

const MyInput:React.FC<any> = (props)=>{
    return (<Input value={props.value} onChange={(e)=>{
      props.onChange(e.target.value);
    }}/>);
}
export default function IndexPage() {
  const [state,setState] = useState('');
  console.log('value');
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <MyInput value={state} onChange={setState}/>
    </div>
  );
}
