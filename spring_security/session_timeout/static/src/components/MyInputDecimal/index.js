import React from 'react';
import {Input} from 'antd';
import Big from 'big.js';

export default class MyInputDecimal extends React.Component{
	onChange = (e)=>{
		try{
			let newValue = this.format(e.target.value);
			this.props.onChange(newValue);
		}catch(e){
			console.log(e);
		}
	}
	format = (value)=>{
		if( !value || value == "" ){
			return ""
		}
		if( value == "-"){
			return "-"
		}
		if( this.props.precision != undefined ){
			let value2 = new Big(value);
			let value3 = value2.round(this.props.precision);
			if( value2.eq(value3) == false ){
				return value3.toString();
			}
			return value
		}else{
			new Big(value);
			return value;
		}
	}
	inputRef = null
	getRef = (inputRef)=>{
		this.inputRef = inputRef;
	}
	focus = ()=>{
		this.inputRef.focus();
	}
	render = ()=>{
		let props = {
			...this.props,
			onChange:this.onChange,
			value:this.format(this.props.value),
			autoComplete:"off",
		}
		return (<Input {...props} ref={this.getRef}/>);
	}
}