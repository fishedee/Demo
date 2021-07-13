import { observer } from '@formily/reactive-react';
import { observable } from '@formily/reactive';
import ChildButton from './ChildButton';

let data = observable({
    open: true,
    buttons: [0],
});
export default observer(() => {
    console.log('Parent Render');
    return (
        <div>
            <div>
                <button
                    key="add"
                    onClick={() => {
                        data.buttons.push(data.buttons.length + 1);
                    }}
                >
                    添加一个
                </button>
                <button
                    key="clear"
                    onClick={() => {
                        data.buttons = [];
                    }}
                >
                    清除
                </button>
                <button
                    key="other"
                    onClick={() => {
                        data.open = !data.open;
                    }}
                >
                    状态：{data.open ? '打开' : '关闭'}
                </button>
            </div>
            {data.buttons.map((id) => {
                return (
                    <ChildButton key={id} name={'按钮' + id} mode={'fish'} />
                );
            })}
        </div>
    );
});
