import React from 'react'
import fetch from 'isomorphic-fetch'

export default class App extends React.PureComponent{
	do1 = async()=>{
		throw new Error("123");
	}
	do2 = async ()=>{
		try{
			throw new Error("456");
		}catch(e){
			throw new Error(e);
		}
	}
	render(){
		return (
		<div>
			<div>Hello World</div>
			<button onClick={this.do1}>点我1</button>
			<button onClick={this.do2}>点我2</button>
			<div>Bundle By Webpack</div>
		</div>
		);
	}
}