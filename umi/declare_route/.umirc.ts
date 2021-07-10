import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    //exact默认为true
    { path: '/', component: '@/pages/index' },

    //exact为false，只要前缀匹配就能成功，最先匹配到component就会最先使用
    //所以在/user/edit页面，依然会显示@/pages/user/index的内容
    { exact:false,path: '/user', component: '@/pages/user/index' },
    { exact:false,path: '/user/edit', component: '@/pages/user/edit'},

    //遇到这个url，会直接跳转，url都会变化，内容显示是list1的内容
    { path: '/list3',redirect: 'list1'},

    //标题
    //不需要配置render，title属性会自动赋值到浏览器的标题上
    {exact:true,path: '/list4',component: '@/pages/list4',title:"我是标题"},

    //包围方式的组件，wrapper与layout的用法很相似，wrapper是针对多个组件的，而layout是多个组件的
    //wrapper的粒度更细，layout粒度粗，但是方便
    {exact:true,path:'/cat',component:'@/pages/cat',wrappers:['@/wrappers/login']},

    //嵌套组件
    {
      path: '/',
      component: '@/layouts/list',
      routes: [
        { path: '/list1', component: '@/pages/list1' },
        { path: '/list2', component: '@/pages/list2' },
      ],
    },

    
  ],
  fastRefresh: {},
});
