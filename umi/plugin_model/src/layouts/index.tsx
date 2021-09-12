import { ReactNode } from "react";

type Props = {
    children:ReactNode
}
export default function IndexPage(props:Props) {
    //全局layout
    return (
      <div>
        <h1>全局页面头部</h1>
        <div>{props.children}</div>
      </div>
    );
  }
  