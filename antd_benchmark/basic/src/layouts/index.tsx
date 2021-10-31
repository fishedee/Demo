import { ReactNode } from "react";
import {useState} from 'react';
type Props = {
    children:ReactNode
}
export default function IndexPage(props:Props) {
    const [refresh,setRefresh] = useState(0);
    const onClick = ()=>{
        setRefresh(refresh+1);
    }
    //全局layout
    return (
      <div>
        <h1>全局页面头部
        <button onClick={onClick}>{"点我刷新"}</button></h1>
        <div key={refresh}>{props.children}</div>
      </div>
    );
}