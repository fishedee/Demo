import styles from './index.less';

function Creator(){
  const String = (props)=>{
    return (<div>{"String"}</div>);
  }
  const Number = (props)=>{
    return (<div>{"Number"}</div>);
  }
  //这是因为生成代码中，也用到了原生的Object对象，而本地定义的变量也用Object命名，撞在一起了
  //解决方法很简单，永远不要以Object，Array，String，Number这些作为变量命名了，真的太傻了
  /*
  var Object = props => {
    return Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
      children: "Object"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 13
    }, this);
  };
  */
  const Object = (props)=>{
    return (<div>{"Object"}</div>);
  }
  const Array = (props)=>{
    return (<div>{"Array"}</div>);
  }
  return {
    String:String,
    Number:Number,
    Object:Object,
    Array:Array,
  };
}

//以下的代码编译时没有问题，但是会报出Maximum call stack size exceeded错误
const creator = Creator();
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div>
        <creator.Array/>
        <creator.Object/>
        <creator.String/>
        <creator.Number/>
      </div>
    </div>
  );
}
