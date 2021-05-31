import React from 'react';
import { connect } from 'redva';
import {Input,Modal} from 'antd';
import StandardForm from '@/components/StandardForm';
import MyRadioButton from '@/components/MyRadioButton';
import qs from 'qs';
import cache from '@/utils/cache';

@connect()
export default class Deail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:{}
		}
	}
	componentDidUpdate = ()=>{
	}
	onChange = (data)=>{
		this.state.data = data;
		this.setState({});
	}
	componentDidMount = async ()=>{
	}
	onSubmit = async ()=>{
		if( this.state.data.newPassword != this.state.data.newPassword2 ){
			throw new Error("输入的两次新密码不一样");
		}
		await this.props.dispatch({
			type:'/user/modMyPassword',
			payload:{
				...this.state.data,
			}
		});
		this.props.history.go(-1);
	}
	render = ()=>{
		let columns = [
			{
				title:"旧密码",
				dataIndex:"oldPassword",
				rules:[{ required: true}],
				render:()=>{
					return (<Input type="password" placeholder="请输入"/>);
				}
			},
			{
				title:"新密码",
				dataIndex:"newPassword",
				rules:[{ required: true}],
				render:()=>{
					return (<Input type="password" placeholder="请输入"/>);
				}
			},
			{
				title:"再次输入新密码",
				dataIndex:"newPassword2",
				rules:[{ required: true}],
				render:()=>{
					return (<Input type="password" placeholder="请输入"/>);
				}
			}
		];
		return (
			<StandardForm
				columns={columns}
				data={this.state.data}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
			/>
		);
	}
}