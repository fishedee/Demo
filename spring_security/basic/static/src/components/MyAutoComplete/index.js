import React from 'react';
import {AutoComplete} from 'antd';

export default class MyAutoComplete extends React.Component{
	constructor(props){
		super(props);
	}
	render = ()=>{
		let { value,dataSource , onChange,filterOption,...resetProps } = this.props; 
		filterOption = filterOption || function(inputValue,option){
			 return option.indexOf(inputValue) !== -1;
		}
		return (<AutoComplete 
			backfill={true}
			dataSource={dataSource} 
			filterOption={function(input, option){
				return filterOption(input,option.props.children)
			}}
			onChange={onChange}
			value={value}
			{...resetProps}/>);
	}
}