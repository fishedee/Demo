import { FormItem, IFormItemProps } from "@formily/antd"
import { ReactElement, cloneElement } from 'react';
import FormChecker from "./FormChecker";

const FieldBoost: <RecordType, K extends keyof RecordType>(props: IFormItemProps & {
    children: ReactElement,
    manualRefresh: () => void;
    twoWayBind?: boolean,
    onGetValue?: (e: any) => void;
    onChange?: (e: any) => void;
    data: RecordType,
    dataIndex: K,
    formChecker: FormChecker,
}) => ReactElement = (props) => {
    const { children, manualRefresh, twoWayBind, onGetValue, onChange, data, dataIndex, formChecker, ...resetProps } = props;
    const getValue = (e: any) => {
        let value = e;
        if (e && e.target) {
            value = e.target.value;
        }
        data[dataIndex] = value;
        const validateResult = formChecker.validate(data, dataIndex);
        if (onGetValue) {
            onGetValue(e);
        }
        return validateResult;
    }
    let newChildren: JSX.Element;
    if (!twoWayBind) {
        const newOnChange = onChange ? onChange : (e: any) => {
            const { shouldRefresh } = getValue(e);
            if (shouldRefresh) {
                manualRefresh();
            }
        }
        //绑定defaultValue
        newChildren = cloneElement(children, {
            key: formChecker.getId(data, dataIndex),
            defaultValue: data[dataIndex],
            onChange: newOnChange,
        });
    } else {
        //绑定Value
        const newOnChange = onChange ? onChange : (e: any) => {
            getValue(e);
            manualRefresh();
        }
        newChildren = cloneElement(children, {
            value: data[dataIndex],
            onChange: newOnChange,
        });
    }
    return (<FormItem
        feedbackStatus={formChecker.getFeedbackStatus(data, dataIndex)}
        feedbackText={formChecker.getFeedbackText(data, dataIndex)}
        {...resetProps}
    >
        {newChildren}
    </FormItem>);
}

export default FieldBoost;