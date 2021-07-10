import { Redirect } from 'umi'

export default (props:any) => {
  const isLogin = Math.random() < 0.5
  console.log(isLogin)
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return (<div>汽车走了</div>);
  }
}