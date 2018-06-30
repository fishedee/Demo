import React from 'react'

export default class App extends React.PureComponent{
	onClick = ()=>{
		console.log(hahah);
	}
	render(){
		return (
			<div>
				<div>Hello World</div>
				<button onClick={this.onClick}>点我</button>
			</div>
		);
	}
}