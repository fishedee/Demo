import React from 'react';
import {Form,Button,Row,Col} from 'antd';
import DefaultForm from '@/components/DefaultForm';

const FormItem = Form.Item;

@DefaultForm
export default class StandardForm extends React.Component{
	state = {
		submitLoading:false,
	}
	handleSubmit = async (e)=>{
		const { form } = this.props;
		e.preventDefault();
		e.stopPropagation();
		form.validateFields({force:true},async (err,values)=>{
			if( err ){
				return;
			}
			try{
				this.setState({submitLoading:true});
				await this.props.onSubmit(values);
				this.setState({submitLoading:false});
			}finally{
				this.setState({submitLoading:false});
			}	
		})
	}
	handleReset = ()=>{
		const { form } = this.props;
		form.resetFields();
	}
	renderFormItem = ()=>{
		const { form } = this.props;
		const { getFieldDecorator } = form;
		let columns = this.props.columns;
		let formItem = [];
		for( let i in columns ){
			let singleColumn = columns[i];
			let labelCol;
			let wrapperCol;
			let allCol;
			if( !singleColumn.labelCol 
				&& !singleColumn.wrapperCol ){
				singleColumn.labelCol = {
					span:4,
					offset:0
				}
				singleColumn.wrapperCol = {
					span:20,
					offset:0,
				}
			}
			singleColumn.labelCol = {
				span:(singleColumn.labelCol && singleColumn.labelCol.span) || 0,
				offset:(singleColumn.labelCol && singleColumn.labelCol.offset) || 0
			}
			singleColumn.wrapperCol = {
				span:(singleColumn.wrapperCol && singleColumn.wrapperCol.span) || 0,
				offset:(singleColumn.wrapperCol && singleColumn.wrapperCol.offset) || 0
			}
			allCol = singleColumn.labelCol.span + singleColumn.labelCol.offset +
				singleColumn.wrapperCol.span + singleColumn.wrapperCol.offset
			labelCol = {
				span:singleColumn.labelCol.span*24/allCol,
				offset:singleColumn.labelCol.offset*24/allCol
			}
			wrapperCol = {
				span:singleColumn.wrapperCol.span*24/allCol,
				offset:singleColumn.wrapperCol.offset*24/allCol
			}
			formItem.push(
				<Col span={allCol}
					key={singleColumn.dataIndex}>
					<FormItem 
						labelCol={labelCol}
						wrapperCol={wrapperCol}
			          	label={singleColumn.title}>
		        	{getFieldDecorator(singleColumn.dataIndex,{rules:singleColumn.rules})(singleColumn.render())}
		        	</FormItem>
		        </Col>
			);
		}
		return formItem;
	}
	renderButton = ()=>{
		if( this.props.onSubmit ){
			let submitCol = this.props.submitCol;
			let submitText = this.props.submitText || '保存';
			let resetText = this.props.resetText || '重置';
			if( !submitCol ){
				submitCol = {
					span:20,
					offset:4
				}
			}
			submitCol = {
				span:submitCol.span || 0,
				offset:submitCol.offset || 0
			}
			return(
				<Col span={24}
					key={"__submit"}>
					<FormItem 
						wrapperCol={submitCol}>
						<Button type="primary" htmlType="submit" loading={this.state.submitLoading}>{submitText}</Button>
						<Button onClick={this.handleReset} style={{marginLeft:'10px'}}>{resetText}</Button>
					</FormItem>
				</Col>
			);
		}else{
			return null;
		}
	}
	render = ()=>{
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row>
					{this.renderFormItem()}
				</Row>
				<Row>
					{this.renderButton()}
				</Row>
			</Form>
		);
	}
}