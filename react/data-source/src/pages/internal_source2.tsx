import styles from './index.less';
import {Input,Button} from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const useManualRefresh = ()=>{
    const [state,setState] = useState(0);
    return {
        manualRefresh:()=>{
            setState(v=>v+1);
        }
    }
}

const MyInput:React.FC<any> = forwardRef((props,ref)=>{
    const {manualRefresh} = useManualRefresh();
    return (<Input value={props.value[props.name]} onChange={(e)=>{
        props.value[props.name] = e.target.value;
        if( props.onChange ){
            props.onChange();
        }
        manualRefresh();
    }}/>);
});

const ShowTip:React.FC<any> = (props)=>{
    return <h2>状态为：{props.value}</h2>
};

export default function IndexPage() {
    const {manualRefresh} = useManualRefresh();
    const refData = useRef({name:''});
  console.log('render');
  return (
    <div>
      <Button onClick={()=>{
        refData.current.name = "Fish";
        manualRefresh();
      }} type="primary">{'外部设置数据为：Fish'}</Button>
      <Button onClick={()=>{
          console.log('state',refData.current);
      }}>{'获取全部数据'}</Button>
      <MyInput value={refData.current} name="name" onChange={()=>{
          manualRefresh();
      }}/>
      <MyInput value={refData.current} name="name2"/>
      {<ShowTip value={refData.current.name}/>}
    </div>
  );
}
