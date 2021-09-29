import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  //完全注释routes内容，不要将routes设置为空数组，这样才能开启约定式路由
  /*
  routes: [
  ],
  */

  fastRefresh: {},
});
