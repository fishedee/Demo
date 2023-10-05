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
	constructor(props){
		super(props);
		this.state = {
			captchaImg:"",
		}
	}
	componentDidMount = async()=>{
		let captchaImg = await this.props.dispatch({
			type:'login/getCaptcha',
		});
		this.state.captchaImg = captchaImg;
		this.setState({});
	}
	onSubmit = async (value)=>{
		try{
			await this.props.dispatch({
				type:'login/login',
				payload:{
					user:value.userName,
					password:value.password,
					captcha:value.captcha,
					"remember-me":value.isRemember,
				}
			});
		}catch(e){
			//失败的时候重新拉验证码
			this.componentDidMount();
			throw e;
		}
		
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
				captchaHolder="请输入验证码"
				captcha={this.state.captchaImg}
				onSubmit={this.onSubmit}
			/>
			<GlobalFooter className={style.footer} copyright={copyright}/>
		</div>
		);
	}
}