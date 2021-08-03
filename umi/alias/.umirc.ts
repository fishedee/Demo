import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  //url的前缀
  //http://localhost:8000/#/docs/
  //http://localhost:8000/#/gg
  base: '/docs/',

  //js文件的输出目录，这里可以填写cdn的名称
  //<script src="/static/umi.2738c99d.js"></script>
  //<link rel="stylesheet" href="/static/umi.f3c25626.css" />
  publicPath: '/static/',

  //文件是否应该还有哈希
  //umi.f3c25626.css
  hash: true,

  //跳转页面用hash形式吗
  //http://localhost:8000/#/gg
  history: {
    type: 'hash',
  },
  nodeModulesTransform: {
    type: 'none',
  },

  //手动的设置路由
  routes: [
    //http://localhost:8000/#/
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  alias:{
    'my_package':path.resolve(__dirname,"./my_package"),
  }
});
