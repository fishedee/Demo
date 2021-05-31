import React from 'react';

export default class InputWrapper extends React.Component{
	render = ()=>{
		const {style,className,prefix,suffix,children,...resetProps} = this.props;
		return (
			<div style={style} className={className}>
				{prefix}
				{React.cloneElement(children,resetProps)}
				{suffix}
			</div>
		);
	}
}