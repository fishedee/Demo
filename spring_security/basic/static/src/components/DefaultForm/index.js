import React from 'react';
import { Form } from 'antd';

export default function DefaultForm(component){
	let FormComponent = Form.create({
	  onFieldsChange(props, changedFields) {
	    props.onChange(changedFields);
	  },
	  mapPropsToFields(props) {
	  	let obj = {};
	  	for( let i in props.data ){
	  		let singleProps = props.data[i];
	  		obj[i] = Form.createFormField(singleProps);
	  	}
	  	return obj;
	  },
	})(component);
	return class FormWrapper extends React.Component{
	  state = {
	  	data:{}
	  }
	  formRef = null
	  static getDerivedStateFromProps(props, state) {
	  	let newData = {};
  		for( let key in props.data ){
  			let singleData = props.data[key];
  			let oldData = state.data[key];
  			if( oldData ){
  				newData[key] = {
  					...oldData,
  					value:singleData
  				}
  			}else{
  				newData[key] = {
  					value:singleData
  				}
  			}
  		}
  		return {
  			data:newData,
  		};
	  }
	  validateFields = (validator)=>{
	  	return new Promise((resolve,reject)=>{
	  		this.formRef.validateFields((err,data)=>{
	  			resolve({err,data});
	  		});
	  	})
	  }
	  onChange = (changedFields)=>{
	  	this.state.data = {
	  		...this.state.data,
	  		...changedFields,
	  	};
	  	let newData = {};
	  	for( let i in this.state.data ){
	  		newData[i] = this.state.data[i].value;
	  	}
	  	this.props.onChange(newData);
	  }
	  render = ()=>{
	  	const {data,onChange,...resetProps} = this.props;
	    return (<FormComponent data={this.state.data} onChange={this.onChange} ref={(node)=>{this.formRef=node}} {...resetProps} />);
	  }
	}
}