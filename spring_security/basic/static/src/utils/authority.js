import React from 'react';
import { connect } from 'redva';
import { Redirect } from 'redva/router';
import { Spin } from 'antd';
import qs from 'qs';

export default function authority(roles){
	return function(Component){
		@connect((state)=>{
			return {login:state.login};
		})
		class Authority extends React.Component{
			componentDidMount = async ()=>{
				if( this.props.login == null ){
					this.props.dispatch({
						type:'login/islogin',
					});
				}
			}
			render = () => {
				if( this.props.login == null ){
					return (<Spin size="large" />);
				}else{
					let {login,dispatch,...restProps} = this.props; 
					let role = login.role;
					if( roles.indexOf(role) != -1 ){
						return (<Component {...restProps}/>);
					}else{
						return (<Redirect to={{
							pathname:'/login',
							search:qs.stringify({
								redirect:this.props.location.pathname+this.props.location.search,
							})
						}}/>);
					}
				}
			}
		}
		return Authority;
	}
} 