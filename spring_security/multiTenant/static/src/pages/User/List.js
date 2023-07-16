import React,{Fragment} from 'react';
import { connect } from 'redva';
import { Button , Input ,InputNumber,Divider,Popconfirm} from 'antd';
import MySelect from '@/components/MySelect';
import StandardQuery from '@/components/StandardQuery';
import StandardTable from '@/components/StandardTable';
import qs from 'qs';
import cache from '@/utils/cache';
import axios from 'axios';

const roleOption = {
	1:'管理员',
	2:'文员',
	3:'仓管',
};

const enabledOption = {
	1:"可用",
	2:"停用",
}

@connect((state)=>{
	return {loading:state.loading.global};
})
export default class List extends React.Component{
	constructor(props){
		super(props);
		this.state = cache.get('/user/list') || {
			list:[],
			where:{},
			limit:{
				pageIndex:0,
				pageSize:10,
				count:0,
			}
		}
	}
	componentDidUpdate = ()=>{
		cache.set('/user/list',this.state);
	}
	onQueryChange = (where)=>{
		this.state.where = where;
		this.state.limit.pageIndex = 0;
		this.setState({});
		this.fetch();
	}
	onPaginactionChange = (limit)=>{
		this.state.limit = limit;
		this.fetch();
		this.setState({});
	}
	componentDidMount = ()=>{
		this.fetch();
	}
	fetch = async ()=>{
		let where = { ...this.state.where };
		let limit = { 
			...this.state.limit , 
			count:undefined
		};
		let data = await this.props.dispatch({
			type:'/user/search',
			payload:{
				...where,
				...limit,
			}
		});
		this.state.limit.count = data.count;
		this.state.list = data.data;
		this.setState({});
	}
	add = async ()=>{
		this.props.history.push({
			pathname:'/user/detail',
			search:qs.stringify({
				hasBack:true
			})
		});
	}
	mod = async (userId)=>{
		this.props.history.push({
			pathname:'/user/detail',
			search:qs.stringify({
				userId:userId,
				hasBack:true
			})
		});
	}
	modPassword = async(userId)=>{
		this.props.history.push({
			pathname:'/user/password',
			search:qs.stringify({
				userId:userId,
				hasBack:true,
			})
		});
	}
	render = ()=>{
		let queryColumns = [
			{
				title:"账号",
				dataIndex:"name",
				render:()=>{
					return (<Input placeholder="请输入"/>);
				}
			}
		];
		 const columns = [
	      {
	        title: '用户ID',
	        dataIndex: 'userId',
	      },
	      {
	        title: '账号',
	        dataIndex: 'name',
	      },
	      {
	        title: '操作',
	        render: (val,data) => {
				const onLoginChange = async ()=>{
					await axios({
						method:'POST',
						url:'/login/impersonate',
						params:{
							username:data.name,
						}
					});
					window.location.reload();
				}
	        	return (<div >
					<a onClick={onLoginChange}>{'切换到该用户'}</a>
					</div>);
			},
	      },
	    ];
		return (
			<div>
				<StandardQuery 
					columns={queryColumns} 
					data={this.state.where}
					onChange={this.onQueryChange}/>
				<div style={{marginTop:'16px'}}>
					<Button type="primary" onClick={this.add}>添加用户</Button>
				</div>
				<StandardTable 
					style={{marginTop:'16px'}}
					rowKey={'userId'}
					loading={this.props.loading}
					columns={columns}
					value={this.state.list}
					paginaction={this.state.limit}
					onPaginactionChange={this.onPaginactionChange}/>
			</div>
		);
	}
}