import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  //资源文件.css，.js，和.html这些的url前缀
  publicPath:'/static/',

  //页面路由的url前缀
  base:'kk',

  //打包后输出的文件夹
  outputPath:'/myDist',

  fastRefresh: {},
});
