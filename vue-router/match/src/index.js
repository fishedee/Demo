import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './login'
import User from './user'
import Home from './home'
import HomeNothing from './homeNothing'
import Friend from './friend'
import Timeline from './timeline'
import NotFound from './notfound'
import App from './app'

Vue.use(VueRouter);

const routes = [
  { 
  	path: '/login', 
  	component: Login 
  },
  { 
  	path: '/user/:userId', 
  	component: User 
  },
  {
  	path:'/',
  	component:Home,
  	children:[
  		{
  			path:"",
  			component:HomeNothing
  		},
  		{
  			path:"/friend",
  			component:Friend
  		},
  		{
  			path:"/timeline",
  			component:Timeline
  		},
      {
        path:"/time",
        redirect:'/timeline'
      }
  	]
  },
  {
  	path:"*",
  	component:NotFound
  }
]

const router = new VueRouter({
  routes:routes
})

new Vue({
	el: '#root',
	router:router,
	render:(createElement)=>createElement(App)
})