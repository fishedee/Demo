import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import {
  Button,
  Form,
  Card,
} from 'antd';

@connect(({ counter, loading }) => ({
  counter,
  loading: loading.models.counter,
}))
@Form.create()
export default class CounterForms extends PureComponent {
	inc = ()=>{
		this.props.dispatch({
			type: 'counter/inc',
          	payload: 1,
		});
	}
	dec = ()=>{
		this.props.dispatch({
			type: 'counter/inc',
          	payload: -1,
		});
	}
	render() {

	const { counter, loading } = this.props;
	console.log(counter,loading);
    return (
      <PageHeaderLayout
        title="计数器"
        content="计数器测试"
      >
      	 <Card bordered={false}>
	      	<div>{counter}</div>
	      	<Button type="primary" onClick={this.inc}>
	           自增
	        </Button>
	        <Button type="primary" onClick={this.dec}>
	           自减
	        </Button>
        </Card>
      </PageHeaderLayout>
     );
    }
}