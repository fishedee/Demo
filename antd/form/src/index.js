import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

@Form.create({
  onValuesChange(props,values,allValues){
    props.onChange(allValues);
  }
})
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }
  componentDidMount = (e)=>{
    this.props.form.setFieldsValue(this.props.field);
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

class App extends React.Component{
  onChange = (values)=>{
    console.log("onChange ",values);
  }
  onSubmit = (values)=>{
    console.log("onSubmit ",values);
  }
  render = ()=>{
    return (<NormalLoginForm onChange={this.onChange} onSubmit={this.onSubmit} field={{userName:'fish'}}/>);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
          