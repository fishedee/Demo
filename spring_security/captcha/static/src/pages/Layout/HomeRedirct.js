import React from 'react';
import {connect} from 'redva';

@connect((state)=>{
	return {login:state.login};
})
export default class HomeRedirect extends React.Component{
	componentDidMount = ()=>{
		this.props.history.push('/user');
	}
	render(){
		return null;
	}
}