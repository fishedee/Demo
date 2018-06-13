import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import Counter from './counter'
import App from './app'

Vue.use(Vuex)

new Vue({
	el: '#root',
	store:new Vuex.Store(Counter),
	render:(createElement)=>createElement(App)
})