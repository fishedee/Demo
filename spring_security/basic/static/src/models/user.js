import request from '@/utils/request';

export default {
  namespace: 'user',
  state: null,
  actions: {
    async search({payload},{dispatch}){
      return await request('/user/search',{
        method:'GET',
        query:payload,
        autoCheck:true,
      });
    },
    async getAll({payload},{dispatch}){
      let data = await request('/user/search',{
        method:'GET',
        query:{
          pageIndex:-1,
          pageSize:-1,
        },
        autoCheck:true,
      });
      let result = {};
      for( var i in data.data ){
        var single = data.data[i];
        result[single.userId] = single;
      }
      return result;
    },
    async get({payload},{dispatch}){
      return await request('/user/get',{
        method:'GET',
        query:payload,
        autoCheck:true,
      })
    },
    async mod({payload},{dispatch}){
      return await request('/user/mod',{
        method:'POST',
        body:payload,
        autoCheck:true,
      })
    },
    async modPassword({payload},{dispatch}){
      return await request('/user/modpassword',{
        method:'POST',
        body:payload,
        autoCheck:true,
      })
    },
    async modMyPassword({payload},{dispatch}){
      return await request('/user/modmypassword',{
        method:'POST',
        body:payload,
        autoCheck:true,
      })
    },
    async add({payload},{dispatch}){
      return await request('/user/add',{
        method:'POST',
        body:payload,
        autoCheck:true,
      })
    }
  }
};
