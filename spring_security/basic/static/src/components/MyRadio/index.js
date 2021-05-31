import React from 'react';
import {Radio} from 'antd';

const RadioGroup = Radio.Group;

export default class MyRadio extends React.Component{
	render = ()=>{
		let {value,radios,renderRadios,...resetProps} = this.props;
		renderRadios = renderRadios || function(value,key){
			return value;
		}
		if( !radios['0']){
			//options没有0值时，0和undefined等同
			if( !value ){
				value = undefined;
			}
		}
		return (<RadioGroup 
			value={value}
			{...resetProps}>
			{Object.entries(radios).map((data)=>{
				return (<Radio key={parseInt(data[0])} value={parseInt(data[0])}>{renderRadios(data[1],parseInt(data[0]))}</Radio>);
			})}
		</RadioGroup>);
	}
}