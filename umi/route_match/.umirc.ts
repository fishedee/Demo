import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history:{
    type: 'hash',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/cat', component: '@/pages/cat',role:"admin"},
    { path: '/dog', component: '@/pages/dog',role:"guest"},
  ],
  fastRefresh: {},
});
