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
		let query = qs.parse(this.props.location.search.substr(1));
		this.state = {
			data:{},
			userId:parseInt(query.userId)
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
		await this.props.dispatch({
			type:'/user/modPassword',
			payload:{
				userId:this.state.userId,
				...this.state.data,
			}
		});
		this.props.history.go(-1);
	}
	render = ()=>{
		let columns = [
			{
				title:"密码",
				dataIndex:"password",
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