import { ReactElement ,useState } from "react"
import {Input} from 'antd';

type MyComponentType<T> = (props:{data:T,dataIndex:keyof T,manualRefresh:()=>void})=>ReactElement;

function ComponentFactory<T>(data:T):MyComponentType<T>{
    const result:MyComponentType<T> = (props)=>{
        return (<div>
            <span>Input</span><Input value={props.data[props.dataIndex] as any} onChange={(e)=>{
                props.data[props.dataIndex] = e.target.value as any;
                props.manualRefresh();
            }}/></div>);
    }
    return result;
}

const data = {
    name:'fish',
    age:123,
}

const Page:React.FC<any> = (props)=>{
    const [state,setState] = useState(0);

    const MyComponent = ComponentFactory(data);


    const manualRefresh = ()=>{
        setState((v)=>v+1);
    }
    return (
        <div>
            <MyComponent data={data} dataIndex={'name'} manualRefresh={manualRefresh}/>
            <MyComponent data={data} dataIndex={'age'} manualRefresh={manualRefresh}/>
        </div>
    );
}

export default Page;