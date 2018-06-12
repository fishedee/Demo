import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from './foo'
import Bar from './bar'
import App from './app'
import Login from './login'

Vue.use(VueRouter);

const routes = [
  { path: '/foo', component: Foo ,meta: { requiresAuth: true }},
  { path: '/bar', component: Bar},
  { path: '/login', component: Login},
]

const router = new VueRouter({
  routes:routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !!record.meta.requiresAuth)) {
	next({
		path: '/login',
		query: { redirect: to.fullPath }
	})
  } else {
    next()
  }
})

new Vue({
	el: '#root',
	router:router,
	render:(createElement)=>createElement(App)
})