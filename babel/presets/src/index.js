import add from './add';
import React from 'react';

const delay = (timeout)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,timeout);
	})
}

export default class App extends React.PureComponent{
	async fetch(){
		await delay(100);
		console.log('success');
	}
	render(){
		return (
			<div>
				<div>Hello Fish</div>
				<button onClick={this.fetch}></button>
			</div>
		);
	}
}