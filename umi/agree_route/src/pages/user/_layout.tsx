import { ReactNode } from "react";

type Props = {
    children:ReactNode
}
export default function IndexPage(props:Props) {
  //仅user页面的layout
    return (
      <div>
        <h1>用户页面头部</h1>
        <div>{props.children}</div>
      </div>
    );
  }
  