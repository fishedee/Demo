import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

function MyForm(component){
	let FormComponent = Form.create({
	  onFieldsChange(props, changedFields) {
	    props.onChange(changedFields);
	  },
	  mapPropsToFields(props) {
	  	let obj = {};
	  	for( let i in props.data ){
	  		let singleProps = props.data[i];
	  		obj[i] = Form.createFormField(singleProps);
	  	}
	  	return obj;
	  },
	})(component);
	return class FormWrapper extends React.PureComponent{
	  state = {
	  	data:{}
	  }
	  static getDerivedStateFromProps(props, state) {
	  	if( props.data != state.prevData ){
	  		let newData = {};
	  		for( let key in props.data ){
	  			let singleData = props.data[key];
	  			let oldData = state.data[key];
	  			if( oldData ){
	  				newData[key] = {
	  					...oldData,
	  					value:singleData
	  				}
	  			}else{
	  				newData[key] = {
	  					value:singleData
	  				}
	  			}
	  		}
	  		return {
	  			prevData:props.data,
	  			data:newData,
	  		};
	  	}
	  	return null;
	  }
	  onChange = (changedFields)=>{
	  	this.state.data = {
	  		...this.state.data,
	  		...changedFields,
	  	};
	  	let newData = {};
	  	for( let i in this.state.data ){
	  		newData[i] = this.state.data[i].value;
	  	}
	  	this.props.onChange(newData);
	  }
	  render = ()=>{
	  	const {data,onChange,...resetProps} = this.props;
	    return (<FormComponent data={this.state.data} onChange={this.onChange} {...resetProps}/>);
	  }
	}
}

@MyForm
class NormalLoginForm extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

class App extends React.PureComponent{
	state = {
		data:{
			userName:"123",
			password:"456"
		}
	}
	onChange = (values)=>{
		this.setState({data:values});
	}
	onSubmit = (values)=>{
		console.log(values);
	}
	render(){
		return (<NormalLoginForm data={this.state.data} onChange={this.onChange} onSubmit={this.onSubmit}/>);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
          