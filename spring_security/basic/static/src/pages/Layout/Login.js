import React from 'react';
import {Col} from 'antd';
import CheckIn from '@/components/CheckIn';
import GlobalFooter from '@/components/GlobalFooter';
import {copyright,title} from '@/utils/constant';
import style from './Login.less';
import qs from 'qs';
import {connect} from 'redva';

@connect()
export default class LoginPage extends React.Component{
	onSubmit = async (value)=>{
		await this.props.dispatch({
			type:'login/login',
			payload:{
				user:value.userName,
				password:value.password,
				"remember-me":value.isRemember,
			}
		});
		let query = qs.parse(this.props.location.search.substr(1));
		if( query.redirect ){
			this.props.history.push('/');
			this.props.history.push(query.redirect);
		}else{
			this.props.history.push('/');
		}
	}
	render(){
		return (
		<div className={style.root}>
			<CheckIn 
				className={style.content}
				logo="https://image.fishedee.com/FulTCoakq411USQX_3HiZ79_fH0i"
				title={title}
				userNamePlaceHolder="账号fish"
				passwordPlaceHolder="密码123"
				onSubmit={this.onSubmit}
			/>
			<GlobalFooter className={style.footer} copyright={copyright}/>
		</div>
		);
	}
}