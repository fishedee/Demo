import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Name from './name'
import App from './app'

Vue.use(VueRouter);

const routes = [
  { 
  	path: '/:name', component: Name },
]

const router = new VueRouter({
  routes:routes
})

new Vue({
	el: '#root',
	router:router,
	render:(createElement)=>createElement(App)
})