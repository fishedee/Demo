import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class MyDatePicker extends React.Component{
	onChange = (date,dateString)=>{
		if( dateString == ''){
			dateString = undefined;
		}
		this.props.onChange(dateString);
	}
	render = ()=>{
		let props = {
			...this.props,
		};
		if( !props.format ){
			props.format = 'YYYY-MM-DD';
		}
		if( props.defaultPickerValue ){
			props.defaultPickerValue = moment(props.defaultPickerValue,props.format);
		}
		if( props.value ){
			props.value = moment(props.value,props.format);
		}
		if( props.onChange ){
			props.onChange = this.onChange;
		}
		return (<DatePicker {...props}/>);
	}
}

MyDatePicker.MyMonthPicker = class MyMonthPicker extends React.Component{
	onChange = (date,dateString)=>{
		if( dateString == ''){
			dateString = undefined;
		}
		this.props.onChange(dateString);
	}
	render = ()=>{
		let props = {
			...this.props,
		};
		if( !props.format ){
			props.format = 'YYYY-MM';
		}
		if( props.defaultPickerValue ){
			props.defaultPickerValue = moment(props.defaultPickerValue,props.format);
		}
		if( props.value ){
			props.value = moment(props.value,props.format);
		}
		if( props.onChange ){
			props.onChange = this.onChange;
		}
		return (<MonthPicker {...props}/>);
	}
}

MyDatePicker.MyWeekPicker = class MyWeekPicker extends React.Component{
	onChange = (date,dateString)=>{
		if( dateString == ''){
			dateString = undefined;
		}
		this.props.onChange(dateString);
	}
	render = ()=>{
		let props = {
			...this.props,
		};
		if( !props.format ){
			props.format = 'YYYY-WW';
		}
		if( props.defaultPickerValue ){
			props.defaultPickerValue = moment(props.defaultPickerValue,props.format);
		}
		if( props.value ){
			props.value = moment(props.value,props.format);
		}
		if( props.onChange ){
			props.onChange = this.onChange;
		}
		return (<WeekPicker {...props}/>);
	}
}

MyDatePicker.MyRangePicker = class MyRangePicker extends React.Component{
	onChange = (date,dateString)=>{
		if( dateString[0] == '' &&
			dateString[1] == '' ){
			dateString = undefined;
		}
		this.props.onChange(dateString);
	}
	render = ()=>{
		let props = {
			...this.props,
		};
		if( !props.format ){
			props.format = 'YYYY-MM-DD';
		}
		if( props.value ){
			props.value = [
				moment(props.value[0],props.format),
				moment(props.value[1],props.format)
			]
		}
		if( props.onChange ){
			props.onChange = this.onChange;
		}
		return (<RangePicker {...props}/>);
	}
}