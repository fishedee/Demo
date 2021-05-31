import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class MyTimePicker extends React.Component{
	onChange = (date,timeString)=>{
		if( timeString == ''){
			timeString = undefined;
		}
		this.props.onChange(timeString);
	}
	render = ()=>{
		let props = {
			...this.props,
		};
		if( !props.format ){
			props.format = 'HH:mm:ss';
		}
		if( props.value ){
			props.value = moment(props.value,props.format);
		}
		if( props.onChange ){
			props.onChange = this.onChange;
		}
		return (<TimePicker {...props}/>);
	}
}