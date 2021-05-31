import React from 'react';
import { connect } from 'redva';
import {Input,Modal} from 'antd';
import StandardForm from '@/components/StandardForm';
import MyRadioButton from '@/components/MyRadioButton';
import qs from 'qs';
import cache from '@/utils/cache';

const roleOption = {
	1:'管理员',
	2:'文员',
	3:'仓管',
}

const enabledOption = {
	1:"可用",
	2:"停用",
}

@connect()
export default class Deail extends React.Component{
	constructor(props){
		super(props);
		let query = qs.parse(this.props.location.search.substr(1));
		if( query.userId ){
			this.state = {
				data:{},
				userId:parseInt(query.userId)
			}
		}else{
			this.state = cache.get('/user/detail') || {
				data:{}
			}
		}
	}
	componentDidUpdate = ()=>{
		if( !this.state.userId ){
			cache.set('/user/detail',this.state);
		}
	}
	onChange = (data)=>{
		this.state.data = data;
		this.setState({});
	}
	componentDidMount = async ()=>{
		if( this.state.userId ){
			let data = await this.props.dispatch({
				type:'/user/get',
				payload:{
					userId:this.state.userId,
				}
			});
			this.state.data = data;
			this.setState({});
		}
	}
	onSubmit = async ()=>{
		if( this.state.userId ){
			await this.props.dispatch({
				type:'/user/mod',
				payload:{
					userId:this.state.userId,
					...this.state.data,
				}
			});
			this.props.history.go(-1);
		}else{
			await this.props.dispatch({
				type:'/user/add',
				payload:{
					...this.state.data,
					password:'123456',
				}
			});
			this.state.data = {};
			this.componentDidUpdate();
			Modal.success({
				title: '添加用户成功',
				content: '添加用户成功，初始密码为123456',
				onOk:()=>{
					this.props.history.go(-1);
				},
				onCancel:()=>{
					this.props.history.go(-1);
				}
			});
		}
		
	}
	render = ()=>{
		let columns = [
			{
				title:"名称",
				dataIndex:"name",
				rules:[{ required: true}],
				render:()=>{
					return (<Input placeholder="请输入"/>);
				}
			},
			{
				title:"角色",
				dataIndex:"role",
				rules:[{ required: true}],
				render:()=>{
					return (<MyRadioButton radios={roleOption}/>);
				}
			},
			{
				title:"是否可用",
				dataIndex:"isEnabled",
				rules:[{ required: true}],
				render:()=>{
					return (<MyRadioButton radios={enabledOption}/>);
				}
			},
			
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