import { Select, AutoComplete, Input, InputRef } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ICellEditorParams } from 'ag-grid-community';
import { ModeContext } from '.';

const KEY_BACKSPACE = 'Backspace';
const KEY_DELETE = 'Delete';
const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';

export default forwardRef((props: ICellEditorParams, ref) => {
    const modeContext = useContext(ModeContext);

    const createInitialState = () => {
        let startValue;

        if (props.key === KEY_BACKSPACE || props.key === KEY_DELETE) {
            // if backspace or delete pressed, we clear the cell
            startValue = '';
        } else if (props.charPress) {
            // if a letter was pressed, we start with the letter
            startValue = props.charPress;
        } else {
            // otherwise we start with the current value
            startValue = props.value;
        }

        return {
            value: startValue,
        };
    };

    const initialState = createInitialState();
    const [value, setValue] = useState(initialState.value);
    const refInput = useRef<RefSelectProps>(null);
    const refInput2 = useRef<InputRef>(null);
    let nextRef = useRef<{ hasNext: boolean }>({ hasNext: false });
    // focus on the input
    useEffect(() => {
        // get ref from React component
        window.setTimeout(() => {
            const eInput = refInput.current!;
            eInput.focus();
            refInput2.current!.select();
        }, 0);
    }, []);

    const options = [
        {
            label: 'fish',
            value: 'fish',
        },
        {
            label: 'cat',
            value: 'cat',
        },
        {
            label: 'dog',
            value: 'dog',
        },
        {
            label: 'sheep',
            value: 'sheep',
        },
        {
            label: 'goat',
            value: 'goat',
        },
        {
            label: 'cow',
            value: 'cow',
        }
    ];

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                const targetOption = options.filter((single) => {
                    return single.value == value;
                });
                if (targetOption.length == 0) {
                    return "";
                } else {
                    return value;
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
        <div>
            <AutoComplete
                ref={refInput}
                className={'simple-input-editor'}
                value={value}
                onChange={(event: any) => {
                    console.log('setValue', event);
                    setValue(event)

                }}
                options={options}
                defaultOpen={true}
                filterOption={(inputValue, option) => {
                    return option?.label.indexOf(inputValue) != -1;
                }}
                //重置PopupContainer的位置以保证跟随滚动
                getPopupContainer={() => {
                    return document.querySelector(".my-grid .ag-center-cols-container")!;
                }}
                onSelect={() => {
                    if (nextRef.current.hasNext) {
                        return;
                    }
                    nextRef.current.hasNext = true;
                    modeContext.mode();
                }}
                onInputKeyDown={(event) => {
                    if (event.key == 'Enter') {
                        if (nextRef.current.hasNext) {
                            return;
                        }
                        nextRef.current.hasNext = true;
                        modeContext.mode();
                    }
                }}
            >
                <Input ref={refInput2} />
            </AutoComplete>
        </div >
    );
});