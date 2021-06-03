import React from 'react';
import {Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class MyCheckbox extends React.Component{
	onChange = (list)=>{
		var result = {};
		var newList = [];
		for( var i in list ){
			var single = list[i];
			if( result[single] ){
				continue;
			}
			result[single] = true;
			newList.push(parseInt(single));
		}
		this.props.onChange(newList);
	}
	render = ()=>{
		let {value,onChange,options,renderOptions,...resetProps} = this.props;
		renderOptions = renderOptions || function(value,key){
			return value;
		}
		let inOptions = [];
		for( var i in options ){
			var option = options[i];
			inOptions.push({
				label:renderOptions(option,i),
				value:parseInt(i),
			});
		}
		let newValue = [];
		for( var i in value ){
			newValue.push(parseInt(value[i]));
		}
		return (<CheckboxGroup
			options={inOptions}
			value={newValue}
			onChange={this.onChange}
			{...resetProps}
		/>);
	}
}