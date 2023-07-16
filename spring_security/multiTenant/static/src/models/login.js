import request from '@/utils/request';
import {routerRedux} from 'redva/router';
export default {
  namespace: 'login',
  state: null,
  mutations: {
    setCurrentLogin(state,{payload}){
      console.log(payload);
      state.login = payload
    }
  },
  actions: {
    async islogin({payload},{dispatch}){
      let user = await request('/login/islogin',{
        method:'GET',
        autoCheck:true,
      });
      if( user.userId != 0 ){
        user.role = user.role;
        await dispatch({
          type:'setCurrentLogin',
          payload:user
        });
      }else{
        await dispatch({
          type:'setCurrentLogin',
          payload:{
            role:'guest'
          }
        });
      }
    },
    async login({payload},{dispatch}){
      let data = await request('/login/login',{
        method:'POST',
        body:payload,
        autoCheck:true,
        useUrlEncode:true,
      })
      await dispatch({
        type:'islogin'
      });
    },
    async logout({payload},{dispatch}){
      let data = await request('/login/logout',{
        method:'POST',
        autoCheck:true,
      })
      await dispatch({
        type:'islogin'
      });
    }
  }
};
