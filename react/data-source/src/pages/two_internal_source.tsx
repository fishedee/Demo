import styles from './index.less';
import {Input,Button} from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const useManualRefresh = ()=>{
    const [state,setState] = useState(0);
    return {
        manualRefresh:()=>{
            setState(v=>v+1);
        }
    }
}

const MyInput:React.FC<any> = forwardRef((props,ref)=>{
    const [state,setState] = useState(props.value);
    const ref2 = useRef<any>();
    useImperativeHandle(ref,()=>({
        getValue(){
            return state;
        }
    }));
    useEffect(()=>{
        ref2.current.focus();
        ref2.current.select();
    },[]);
    return (<Input ref={ref2} value={state} onChange={(e)=>{
        setState(e.target.value);
    }}/>);
});

const WrapInput:React.FC<any> = (props)=>{
    const [isEdit,setIsEdit] = useState(false);
    const ref = useRef<any>();
    if( isEdit == false ){
        return (<div style={{border:'1px solid black',height:'30px'}} onClick={()=>{
            setIsEdit(true);
        }}>{props.value[props.name]}</div>);
    }else{
        return (
        <div onBlur={()=>{
            setIsEdit(false);
            props.value[props.name] = ref.current.getValue();
            if(props.onChange){
                props.onChange();
            }
        }} style={{height:'30px'}}>
            <MyInput ref={ref} value={props.value[props.name]}/>
        </div>
        );
    }
}


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
      <WrapInput value={refData.current} name="name" onChange={()=>{
          manualRefresh();
      }}/>
      <WrapInput value={refData.current} name="name2"/>
      {<ShowTip value={refData.current.name}/>}
    </div>
  );
}
