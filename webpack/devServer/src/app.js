import React from 'react'
import fetch from 'isomorphic-fetch'

export default class App extends React.PureComponent{
	state = {
		data:""
	}
	async getSomething(){
		let data = await fetch('/s?wd=react');
		let txt = await data.text();
		this.setState({data:txt});
	}
	render(){
		let html = {__html:this.state.data}
		return (
		<div>
			<div>Hello World</div>
			<button onClick={this.getSomething.bind(this)}>点我获取数据</button>
			<div dangerouslySetInnerHTML={html}/>
			<div>Bundle By Webpack</div>
		</div>
		);
	}
}