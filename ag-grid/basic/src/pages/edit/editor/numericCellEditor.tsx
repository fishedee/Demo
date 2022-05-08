import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { ICellEditorParams } from 'ag-grid-community';

const KEY_BACKSPACE = 'Backspace';
const KEY_DELETE = 'Delete';
const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';

export default forwardRef((props: ICellEditorParams, ref) => {
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
    const refInput = useRef<HTMLInputElement>(null);

    // focus on the input
    useEffect(() => {
        // get ref from React component
        window.setTimeout(() => {
            const eInput = refInput.current!;
            eInput.focus();
        });
    }, []);

    /* Utility Methods */
    const cancelBeforeStart =
        props.charPress && '1234567890'.indexOf(props.charPress) < 0;

    const isLeftOrRight = (event: any) => {
        return ['ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1;
    };

    const isCharNumeric = (charStr: string) => {
        return !!/\d/.test(charStr);
    };

    const isKeyPressedNumeric = (event: any) => {
        const charStr = event.key;
        return isCharNumeric(charStr);
    };

    const deleteOrBackspace = (event: any) => {
        return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.key) > -1;
    };

    const finishedEditingPressed = (event: any) => {
        const key = event.key;
        return key === KEY_ENTER || key === KEY_TAB;
    };

    const onKeyDown = (event: any) => {
        //FIXME 为什么要阻止冒泡？
        if (isLeftOrRight(event) || deleteOrBackspace(event)) {
            event.stopPropagation();
            return;
        }

        if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
            if (event.preventDefault) event.preventDefault();
        }
    };

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                return value;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            //默认情况下，输入字母和数字都会进入到编辑状态
            //isCancelBeforeStart可以指定只有输入数字的时候才进入到编辑状态
            isCancelBeforeStart() {
                return cancelBeforeStart;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            //当数据大于某个值的时候，取消返回数据
            isCancelAfterEnd() {
                // will reject the number if it greater than 1,000,000
                // not very practical, but demonstrates the method.
                return value > 1000000;
            },
        };
    });

    return (
        <input
            ref={refInput}
            className={'simple-input-editor'}
            value={value}
            onChange={(event: any) => setValue(event.target.value)}
            onKeyDown={(event: any) => onKeyDown(event)}
        />
    );
});