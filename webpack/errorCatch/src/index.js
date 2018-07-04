import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './app'

const errHandler = (err)=>{
	alert(err.message);
	console.error(err);
	console.log(`name:${err.name},message:${err.message}`);
}
window.onunhandledrejection = (evt) =>{
	evt.preventDefault();
	errHandler(evt.reason);
}

ReactDom.render(
	<App/>,
	document.getElementById('root')
);
