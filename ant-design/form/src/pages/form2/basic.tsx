import { Button, Input, Checkbox } from 'antd';
import { useState, useRef } from 'react';
import { FormLayout, FormItem } from '@formily/antd';
import FormHelper from './FormHelper';

type FormType = {
    name: string;
};
export default () => {
    const [state, setState] = useState(0);
    const formData = useRef<FormType>({
        name: '',
    });
    const currentFormData = formData.current;
    return (
        <FormLayout>
            <FormItem
                key={'1'}
                label="Username"
                asterisk={true}
                feedbackStatus={FormHelper.getFeedbackStatus(
                    currentFormData,
                    'name',
                )}
                feedbackText={FormHelper.getFeedbackText(
                    currentFormData,
                    'name',
                )}
            >
                <Input
                    //在Form下面的，不能使用defaultValue
                    key={FormHelper.getId(currentFormData, 'name')}
                    defaultValue={currentFormData.name}
                    onChange={(e) => {
                        currentFormData.name = e.target.value;
                        let { shouldRefresh } = FormHelper.validate(
                            currentFormData,
                            'name',
                            'required',
                            'number',
                        );
                        if (shouldRefresh) {
                            setState((v) => v + 1);
                        }
                        console.log(currentFormData);
                    }}
                />
            </FormItem>
            <Button
                onClick={() => {
                    currentFormData.name = 'jj';
                    FormHelper.refreshId(currentFormData, 'name');
                    FormHelper.clearValidate(currentFormData, 'name');
                    setState((v) => v + 1);
                }}
            >
                {'设置'}
            </Button>

            <FormItem>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </FormItem>
        </FormLayout>
    );
};
