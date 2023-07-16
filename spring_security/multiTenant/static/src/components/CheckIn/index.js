import React from 'react';
import { Link } from 'redva/router';
import { Tabs , Form , Input , Button, Icon,Row,Col,Checkbox} from 'antd';
import styles from './index.less';
import classname from 'classname';

const Tab = Tabs.TabPane;
const FormItem = Form.Item;
@Form.create()
export default class CheckIn extends React.Component {
  onSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.isRemember = !!values.isRemember;
        this.props.onSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const tailFormItemLayout = {
      wrapperCol: {
      },
    };
    return (
      <div className={classname(styles.container,this.props.className)}>
        <Row type="flex" justify="space-around" align="middle" style={{height:"100%"}}>
          <Col type="flex" align="middle" span={8} className={styles.center} >
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>{this.props.title}</span>
              </Link>
            </div>
            <Tabs animated={false}
                  className={styles.tabs}
                  activeKey={"account"}>
              <Tab key="account" tab="账户密码登录">
                <Form onSubmit={this.onSubmit}>
                <FormItem>
                  {getFieldDecorator('tenantId', {
                    rules: [{ required: true, message: '请输入你的租户ID!' }],
                  })(
                    <Input  size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'请输入租户,tenant1/tenant2'} autocomplete="off"/>
                  )}
                  </FormItem>
                  <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入你的用户名!' }],
                  })(
                    <Input  size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.userNamePlaceHolder} autocomplete="off"/>
                  )}
                  </FormItem>
                  <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码!' }],
                  })(
                    <Input id="password" size={'large'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.passwordPlaceHolder} autocomplete="off"/>
                  )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('isRemember', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox size={'large'}>
                      七天免登录
                    </Checkbox>,
                  )}
                  </FormItem>
                  <Button className={styles.login} type='primary' size="large" icon="poweroff" loading={this.props.loading} htmlType='submit'>登录</Button>
                </Form>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
