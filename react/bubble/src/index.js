import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './app3'

ReactDom.render(
	<App/>,
	document.getElementById('root')
);