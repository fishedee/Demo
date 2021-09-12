import { ReactNode } from "react";

type Props = {
    children:ReactNode
}
export default function IndexPage(props:Props) {
    let isAuth = Math.random()<0.5
    if( isAuth ){
        return props.children
    }else{
        return <div>你还没登陆</div>
    }
  }
  