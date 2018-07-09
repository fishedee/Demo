import React from 'react'
import fetch from 'isomorphic-fetch'

const sleep = (delay)=>{
	return new Promise((resolve)=>{
		setTimeout(resolve,delay);
	});
}
export default class App extends React.PureComponent{
	state = {};
	componentDidMount = ()=>{
		//you should not do this
		//this.state = {a:"123"};
		//you should do this!
		this.state.a = "123";

		this.setState({});
		this.fetch();
	}
	fetch = async()=>{
		console.log(this.state);
		await sleep(1000);
		console.log(this.state);
	}
	render(){
		return (
		<div>
			<div>Hello World</div>
		</div>
		);
	}
}