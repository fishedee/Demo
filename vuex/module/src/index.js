import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import Store from './store'
import App from './app'

Vue.use(Vuex)

new Vue({
	el: '#root',
	store:new Vuex.Store(Store),
	render:(createElement)=>createElement(App)
})