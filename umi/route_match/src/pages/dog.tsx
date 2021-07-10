import styles from './index.less';
import { history,Link,useLocation ,useRouteMatch,useHistory} from 'umi';
import { useCallback } from 'react';

function InnerComponent(){
    //可以获取到history，方便跳转使用
    let history = useHistory();
    console.log("innerComponent history",history);

     /*
        {pathname: "/dog", query: {…}, state: {…}, search: "name=Kate", hash: ""}
        hash: ""
        pathname: "/dog"
        query: {name: "Kate"}
        search: "name=Kate"
        state: {count: "count"}
        __proto__: Object
    */
   //带有类型提示的location，并且跨多个组件使用
   let location = useLocation();
   console.log("innerComponent location",location);
   
  /*
  {path: "/dog", url: "/dog", isExact: true, params: {…}}
    isExact: true
    params: {}
    path: "/dog"
    url: "/dog"
  */
    let match = useRouteMatch();
    //match获取了匹配的地址信息，params是url上面的参数
   console.log("innerComponent match",match);
    return (<div>我是内部组件</div>);
}
export default function IndexPage(props) {

    //获取匹配的路由信息，可以获取路由设置上的参数信息
    /*
    component: ƒ IndexPage(props)
    exact: true
    path: "/dog"
    role: "guest"
    */
    console.log(props.route);
  //match获取了匹配的地址信息，params是url上面的参数
  /*
  {path: "/dog", url: "/dog", isExact: true, params: {…}}
    isExact: true
    params: {}
    path: "/dog"
    url: "/dog"
  */
  console.log(props.match);
  //location获取了匹配的参数，区分了query与state
  //state在返回的时候会丢失，但是query会保存下来
  /*
    {pathname: "/dog", query: {…}, state: {…}, search: "name=Kate", hash: ""}
    hash: ""
    pathname: "/dog"
    query: {name: "Kate"}
    search: "name=Kate"
    state: {count: "count"}
    __proto__: Object
  */
  console.log(props.location);
    //使用Link标签
  return (
    <div>
      <h1 className={styles.title}>我是狗</h1>
      <InnerComponent/>
      <div><Link to="/cat">去猫</Link></div>
    </div>
  );
}
