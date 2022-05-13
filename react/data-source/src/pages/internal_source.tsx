import styles from './index.less';
import {Input,Button} from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const MyInput:React.FC<any> = forwardRef((props,ref)=>{
    const [state,setState] = useState('');
    useImperativeHandle(ref,()=>({
        getValue(){
            return state;
        },
        setValue(value:string){
            setState(value);
        }
    }));
    return (<Input value={state} onChange={(e)=>{
        setState(e.target.value);
        setTimeout(props.onChange,0);
    }}/>);
});

const ShowTip:React.FC<any> = (props)=>{
    return <h2>状态为：{props.value}</h2>
};

export default function IndexPage() {
    const [tip,setTip] = useState('');
    const ref = useRef<any>();
    const ref2 = useRef<any>();
  console.log('render');
  return (
    <div>
      <Button onClick={()=>{
        ref.current.setValue('Fish');
        setTip('Fish');
      }} type="primary">{'外部设置数据为：Fish'}</Button>
      <Button onClick={()=>{
          console.log('state',ref.current.getValue());
          console.log('state2',ref2.current.getValue());
      }}>{'获取全部数据'}</Button>
      <MyInput ref={ref} onChange={()=>{
          setTip(ref.current.getValue());
      }}/>
      <MyInput ref={ref2}/>
      {<ShowTip value={tip}/>}
    </div>
  );
}
