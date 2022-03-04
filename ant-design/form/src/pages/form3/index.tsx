import { Button, Input, Checkbox } from 'antd';
import { useState, useRef } from 'react';
import { FormLayout, FormItem } from '@formily/antd';
import { NormalSchema, ObjectSchema } from './FormBoost/FormSchema';
import FieldBoost from './FormBoost/FieldBoost';
import FormChecker from './FormBoost/FormChecker';


const formSchema = new ObjectSchema({
    name: new NormalSchema('required'),
    age: new NormalSchema('required', 'number'),
}, 'required');
const formChecker = new FormChecker(formSchema);

type FormType = {
    name?: string;
    age?: number;
};
export default () => {
    const [state, setState] = useState(0);
    const manualRefresh = () => {
        setState((v) => v + 1);
    }
    const formData = useRef<FormType>({});
    const currentFormData = formData.current;
    return (
        <FormLayout>
            <FieldBoost<typeof currentFormData, keyof typeof currentFormData>
                label="Username"
                asterisk={true}
                formChecker={formChecker}
                data={currentFormData}
                dataIndex='name'
                manualRefresh={manualRefresh}>
                <Input />
            </FieldBoost>
            <FieldBoost<typeof currentFormData, keyof typeof currentFormData>
                label="Age"
                asterisk={true}
                formChecker={formChecker}
                data={currentFormData}
                dataIndex='age'
                manualRefresh={manualRefresh}>
                <Input />
            </FieldBoost>
            <Button
                onClick={() => {
                    currentFormData.name = 'jj';
                    formChecker.refreshId(currentFormData, 'name');
                    formChecker.validateAll(currentFormData);
                    manualRefresh();
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
