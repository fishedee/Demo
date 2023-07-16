import fetch from 'redva/fetch';
import qs from 'qs';

const codeMessage = {
  200: '服务器成功返回请求的数。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(`请求错误 ${response.status}: ${response.url}：${errortext}`);
  error.code = 50001;
  error.msg = `请求错误 ${response.status}: ${response.url}：${errortext}`;
  throw error;
}

function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}

function checkBody(response){
  if( response.code == 0 ){
    return;
  }
  const error = new Error(response.msg);
  error.code = response.code;
  error.msg = response.msg;
  throw error;
}

export default async function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { 
  	...defaultOptions, 
  	...options,
    headers:{
      'X-XSRF-TOKEN':getCookie('XSRF-TOKEN')
    },
  	query:{
  		_t:new Date().valueOf(),
  		...options.query,
  	}
  };
  if( newOptions.method === 'POST' || newOptions.method === 'PUT' ){
      if( options.useUrlEncode == true ){
        newOptions.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...newOptions.headers,
        };
        newOptions.body = qs.stringify(newOptions.body);
      }else {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          ...newOptions.headers,
        };
        newOptions.body = JSON.stringify(newOptions.body);
      }
  }
  
  if( newOptions.query ){
    let query = qs.stringify(newOptions.query);
    if( url.indexOf('?') != -1 ){
      url += '&'+query;
    }else{
      url += '?'+query;
    }
  }
  let response = await fetch(url, newOptions);
  if( newOptions.autoCheck ){
    checkStatus(response);
  }
  
  let data = await response.json();
  if( newOptions.autoCheck ){
    checkBody(data);
  }
  
  if( newOptions.autoCheck ){
    return data.data;
  }else{
    return data;
  }
}
