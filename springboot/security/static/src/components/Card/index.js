import React from 'react';
import style from './index.less';

export default class Card extends React.Component{
	render(){
		const { header } = this.props;
		return (
		<div className={style.root}>
			<div className={style.title}>{this.props.title}</div>
			{header?<div className={style.header}>{header}</div>:null}
			{this.props.children}
		</div>
		);
	}
}