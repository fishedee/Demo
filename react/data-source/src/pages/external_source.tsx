import styles from './index.less';
import {Input,Button} from 'antd';
import { useState } from 'react';

const MyInput:React.FC<any> = (props)=>{
    return (<Input value={props.value} onChange={(e)=>{
      props.onChange(e.target.value);
    }}/>);
}

const ShowTip:React.FC<any> = (props)=>{
  return <h2>状态为：{props.value}</h2>
}
export default function IndexPage() {
  const [state,setState] = useState('');
  const [state2,setState2] = useState('');
  console.log('render');
  return (
    <div>
      <Button onClick={()=>{
        setState('Fish');
      }} type="primary">{'外部设置数据为：Fish'}</Button>
      <Button onClick={()=>{
        console.log('state',state);
        console.log('state2',state2);
      }}>{'获取全部数据'}</Button>
      <MyInput value={state} onChange={setState}/>
      <MyInput value={state2} onChange={setState2}/>
      <ShowTip value={state}/>
    </div>
  );
}
