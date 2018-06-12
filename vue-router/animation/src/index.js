import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from './foo'
import Bar from './bar'
import App from './app'

Vue.use(VueRouter);

const routes = [
  { 
  	path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes:routes
})

new Vue({
	el: '#root',
	router:router,
	render:(createElement)=>createElement(App)
})