
let extraRoutes;
//在触发render以后，就会触发patchRoutes，以获取路由信息
//整个页面仅触发一次
export function patchRoutes({ routes }) {
  console.log("routes");
  for( var i in extraRoutes){
    routes.push(extraRoutes[i])
  }
}

//页面刚进入的时候，触发这个函数，传入的是闭包
//整个页面仅触发一次
export function render(oldRender) {
  console.log("render");
  setTimeout(()=>{
    //写入动态的路由
    extraRoutes = [{
        path:'/dog',
        exact:true,
        component:require('@/pages/dog').default,
    }];
    oldRender();
  },1000);
}

export function onRouteChange({ location, routes, action,matchedRoutes }) {
  console.log("RouteChange",action,location.pathname);
  console.log("matchedRoutes",matchedRoutes);
}