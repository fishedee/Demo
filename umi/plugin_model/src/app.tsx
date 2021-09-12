let id:number = 1000;

function wait(timeout:number){
    return new Promise((resolve)=>{
        setTimeout(resolve,timeout);
    });
}
/**
 * 不能在getInitialState使用其他的model
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
    const fetchCurrentUser = async ()=>{
        await wait(1000);
        return id++;
    }
    const currentUser = await fetchCurrentUser();
    return {
        currentUser:currentUser,
        fetchCurrentUser:fetchCurrentUser,
    };
}

const MyLoading = ()=>{
    return (<div style={{height:'500px',textAlign:"center",lineHeight:"500px",fontSize:40,color:'red'}}>{"正在加载中..."}</div>)
}

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <MyLoading/>,
};