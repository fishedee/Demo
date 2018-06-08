import 'babel-polyfill'
import './index.css'
import Vue from 'vue'
import App from './app.vue'

new Vue({
	el: '#root',
	render:(createElement)=>createElement(App)
})