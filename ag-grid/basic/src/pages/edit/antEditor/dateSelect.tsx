import { Select, AutoComplete, Input, InputRef, DatePicker } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ICellEditorParams } from 'ag-grid-community';

const KEY_BACKSPACE = 'Backspace';
const KEY_DELETE = 'Delete';
const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
import moment from 'moment';
import { ModeContext } from '.';

export default forwardRef((props: ICellEditorParams, ref) => {
    const modeContext = useContext(ModeContext);

    const createInitialState = () => {
        let startValue;

        if (props.key === KEY_BACKSPACE || props.key === KEY_DELETE) {
            // if backspace or delete pressed, we clear the cell
            startValue = null;
        } else if (props.charPress) {
            // if a letter was pressed, we start with the letter
            startValue = moment(props.charPress, 'YYYY-MM-DD');
        } else {
            // otherwise we start with the current value
            startValue = moment(props.value, 'YYYY-MM-DD');
        }
        if (startValue?.isValid() == false) {
            startValue = null;
        }
        return {
            value: startValue,
        };
    };

    const initialState = createInitialState();

    const [value, setValue] = useState(initialState.value);
    const refInput = useRef<RefSelectProps>(null);
    const refInput2 = useRef<HTMLDivElement>(null);

    // focus on the input
    useEffect(() => {
        setTimeout(() => {
            if (!refInput2.current) {
                return;
            }
            let m = refInput2.current!.querySelector('input')!;
            m.focus();
            m.select();
        }, 100);
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                //使用Input的话能直接自己手动输入日期
                let myValue = refInput2.current!.querySelector('input')!.value;
                let myMoment = moment(myValue, 'YYYY-MM-DD');
                console.log('getValue', myValue);
                if (myMoment.isValid()) {
                    return myMoment.format('YYYY-MM-DD');
                } else {
                    return '';
                }
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            //默认情况下，输入字母和数字都会进入到编辑状态
            //isCancelBeforeStart可以指定只有输入数字的时候才进入到编辑状态
            isCancelBeforeStart() {
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            //当数据大于某个值的时候，取消返回数据
            isCancelAfterEnd() {
                // will reject the number if it greater than 1,000,000
                // not very practical, but demonstrates the method.
                return false;
            },
        };
    });
    return (
        <div ref={refInput2}>
            <DatePicker
                value={value}
                onChange={(event: any, dateString: any) => setValue(event)}
                //重置PopupContainer的位置以保证跟随滚动
                getPopupContainer={() => {
                    return document.querySelector(".my-grid .ag-center-cols-container")!;
                }}
                defaultOpen={true}
                onSelect={() => {
                    const ref = modeContext.mode();
                }}
                onKeyDown={(event) => {
                    if (event.key == 'Enter') {
                        const ref = modeContext.mode();
                    }
                }}
            />
        </div>
    );
});