import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  proxy: {
    //将/myapi开头的请求改为到'http://jsonplaceholder.typicode.com/'的请求
    //将/myapi/todos转换为/todos的url
    '/myapi': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/myapi' : '' },
    },
  },
  fastRefresh: {},
});
