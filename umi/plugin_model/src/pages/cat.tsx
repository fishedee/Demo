import { useModel } from "@/.umi/plugin-model/useModel";

export default function IndexPage() {
  const {initialState,setInitialState} = useModel('@@initialState');
  return (
    <div>
      <h1>我是猫页面</h1>
      <div>当前用户为：{initialState?.currentUser}</div>
      <button onClick={async()=>{
          let newId = await initialState?.fetchCurrentUser();
          setInitialState({
            currentUser:newId!,
            fetchCurrentUser:initialState?.fetchCurrentUser!,
          });
      }}>{"点我"}</button>
    </div>
  );
}

//这样是错误写法，要先写入属性，再export
IndexPage.title = "猫页面"