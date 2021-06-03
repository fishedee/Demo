import React from 'react';
import { Form ,Row , Col,Button ,Icon,Input} from 'antd';
import DefaultForm from '@/components/DefaultForm';

const FormItem = Form.Item;

@DefaultForm
export default class StandardQuery extends React.Component{

	handleSearch = (e)=>{
		const { form } = this.props;
		e.preventDefault();
		form.validateFields({force:true},(err, fieldsValue) => {
      		if (err) {
      			return;
      		}
      		this.props.onSubmit(fieldsValue);
      	})
	}

	handleFormReset = ()=>{
		const { form } = this.props;
		form.resetFields();
		this.props.onSubmit({});
	}

	renderForm = ()=>{
		const columns = this.props.columns;
		const { getFieldDecorator } = this.props.form;
		const {style,className} = this.props;
		let formList = [];
		for( let i in columns ){
			let singleColumn = columns[i];
			formList.push(
				<FormItem label={singleColumn.title} key={singleColumn.dataIndex}>
					{getFieldDecorator(singleColumn.dataIndex)(singleColumn.render())}
				</FormItem>
			);
		}
		if( this.props.onSubmit ){
			formList.push(
				<FormItem key={"__button"}>
					<Button type="primary" htmlType="submit">
					  查询
					</Button>
					<Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
				      重置
				    </Button>
				</FormItem>
			);
		}
		return (
	      <Form onSubmit={this.handleSearch} layout="inline" style={style} className={className}>
	        {formList}
	      </Form>
	    );
	}

	render = ()=>{
		return this.renderForm();
	}
}
