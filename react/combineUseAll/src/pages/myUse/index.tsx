import { useState } from 'react';
import ChildButton from './Button';
export default function Parent() {
    let [open, setOpen] = useState(false);
    let [buttons, setButtons] = useState<number[]>([]);
    console.log('Parent Render');
    return (
        <div>
            <div>
                <button
                    key="add"
                    onClick={() => {
                        setButtons((prevState) => [
                            ...prevState,
                            prevState.length + 1,
                        ]);
                    }}
                >
                    添加一个
                </button>
                <button
                    key="clear"
                    onClick={() => {
                        setButtons([]);
                    }}
                >
                    清除
                </button>
                <button
                    key="other"
                    onClick={() => {
                        setOpen((prevOpen) => !prevOpen);
                    }}
                >
                    状态：{open ? '打开' : '关闭'}
                </button>
            </div>
            {buttons.map((id) => {
                return <ChildButton key={id} name={'按钮' + id} />;
            })}
        </div>
    );
}
