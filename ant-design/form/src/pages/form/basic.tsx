import {
    Button,
    Dropdown,
    Menu,
    Space,
    Tag,
    Form,
    Input,
    Checkbox,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import {
    SearchOutlined,
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { useState, useRef } from 'react';

type FormType = {
    name: string;
    nameId: number;
};
export default () => {
    const [state, setState] = useState(0);
    const formData = useRef<FormType>({
        name: '',
        nameId: 1,
    });
    const currentFormData = formData.current;
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input
                    //在Form下面的，不能使用defaultValue
                    key={currentFormData.nameId}
                    defaultValue={currentFormData.name}
                    onChange={(e) => {
                        console.log('onChange');
                        currentFormData.name = e.target.value;
                        console.log(currentFormData);
                    }}
                />
            </Form.Item>
            <Button
                onClick={() => {
                    currentFormData.nameId++;
                    currentFormData.name = 'jj';
                    setState((v) => v + 1);
                }}
            >
                {'设置'}
            </Button>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
