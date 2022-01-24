import { Button, Input, Checkbox } from 'antd';
import { useState, useRef } from 'react';
import { FormLayout, FormItem } from '@formily/antd';

type FormType = {
    name: string;
    nameId: number;
    nameFeedback: string;
};
export default () => {
    const [state, setState] = useState(0);
    const formData = useRef<FormType>({
        name: '',
        nameId: 1,
        nameFeedback: '',
    });
    const currentFormData = formData.current;
    console.log(currentFormData.nameId);
    return (
        <FormLayout>
            <FormItem
                key={'1'}
                label="Username"
                asterisk={true}
                feedbackStatus={
                    currentFormData.nameFeedback != '' ? 'error' : undefined
                }
                feedbackText={currentFormData.nameFeedback}
            >
                <Input
                    //在Form下面的，不能使用defaultValue
                    key={currentFormData.nameId}
                    defaultValue={currentFormData.name}
                    onChange={(e) => {
                        currentFormData.name = e.target.value;
                        let newFeedback = '';
                        if (
                            !currentFormData.name ||
                            currentFormData.name == ''
                        ) {
                            newFeedback = '请输入';
                        }
                        if (newFeedback != currentFormData.nameFeedback) {
                            currentFormData.nameFeedback = newFeedback;
                            setState((v) => v + 1);
                        }
                        console.log(currentFormData);
                    }}
                />
            </FormItem>
            <Button
                onClick={() => {
                    currentFormData.nameId++;
                    currentFormData.name = 'jj';
                    currentFormData.nameFeedback = '';
                    setState((v) => v + 1);
                }}
            >
                {'设置'}
            </Button>

            <FormItem label="Password">
                <Input.Password />
            </FormItem>

            <FormItem>
                <Checkbox>Remember me</Checkbox>
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </FormItem>
        </FormLayout>
    );
};
