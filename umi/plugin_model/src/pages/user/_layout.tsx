import { useModel } from "umi";
import { ReactNode } from "react";

type Props = {
    children:ReactNode
}
export default function IndexPage(props:Props) {

  const {user,signin,signout} = useModel('auth');
  //仅user页面的layout
    return (
      <div>
        <h1>用户页面头部，当前用户为：<span>{user}</span></h1>
        <div>{props.children}</div>
      </div>
    );
  }
  