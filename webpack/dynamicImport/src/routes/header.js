import React from 'react';

export default 	class Header extends React.PureComponent{
	render(){
		return (
			<div>{this.props.title}</div>
		);
	}
}