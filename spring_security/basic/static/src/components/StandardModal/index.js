import React from 'react';
import { Modal } from 'antd';
import style from './index.less';
export default class StandardModal extends React.Component{
	state = {
		confirmLoading:false,
	};
	onCancel = ()=>{
		this.props.onCancel();
	}
	render = ()=>{
		return (
			<Modal
				title={this.props.title||"表单"}
				visible={this.props.visible}
				onCancel={this.props.onCancel}
				maskClosable={false}
				destroyOnClose={true}
				footer={null}
				width={"80%"}
				wrapClassName={style.form}>
				{this.props.children}
			</Modal>
		);
	}
}