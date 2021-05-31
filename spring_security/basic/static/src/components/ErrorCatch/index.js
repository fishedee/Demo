import React from 'react';

export default class ErrorCatch extends React.Component{
	componentDidMount = ()=>{
		window.onunhandledrejection = (option)=>{
			let err = option.reason;
			this.props.onError(err);
			option.preventDefault();
		}
	}
	render(){
		return this.props.children;
	}
}