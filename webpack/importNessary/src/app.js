import React from 'react'
import {Button,Modal} from 'antd'

export default class App extends React.PureComponent{
	onClick(){
		Modal.confirm({
			title:'对话框',
			content:'你点到我了!'
		});
	}

	render(){
		return (
			<div>
				<div>Hello World</div>
				<Button onClick={this.onClick}>点我吧</Button>
			</div>
		);
	}
}