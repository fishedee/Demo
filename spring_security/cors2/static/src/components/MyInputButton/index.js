import React from 'react';
import {Input} from 'antd';

export default class MyModalSelect extends React.Component{
	onChange = ()=>{
		//do nothing
	}
	render = ()=>{
		let props = {
			...this.props,
			value:this.props.children,
			onChange:this.onChange,
			children:null,
		}
		return (<Input {...props}/>);
	}
}