import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './app'

ReactDom.render(
	(<div>
		<div>test2</div>
		<App/>
	</div>),
	document.getElementById('root')
);