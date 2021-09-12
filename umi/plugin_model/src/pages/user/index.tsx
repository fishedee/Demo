import { useModel } from "umi";

function IndexPage() {

    const {user,signin,signout} = useModel('auth');

    return (
      <div>
        <h1>我是用户主页面</h1>
        <button onClick={signin}>{'登录'}</button>
        <button onClick={signout}>{'登出'}</button>
      </div>
    );
  }

IndexPage.wrappers = ['@/wrappers/auth'];
export default IndexPage
  