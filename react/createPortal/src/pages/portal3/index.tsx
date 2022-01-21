import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import ReactDOM, { createPortal } from 'react-dom';

type ProtalRender = (portal: MyPortal) => ReactElement;

class MyPortal {
    private ref: HTMLElement | null = null;

    constructor(private render: ProtalRender) {}

    public open() {
        if (this.ref) {
            throw new Error('对话框已经打开了');
        }
        this.ref = document.createElement('div');
        document.body.appendChild(this.ref);

        const node = this.render(this);

        ReactDOM.render(node, this.ref);
    }

    public rerender() {
        if (!this.ref) {
            throw new Error('对话框未打开');
        }

        const node = this.render(this);
        ReactDOM.render(node, this.ref);
    }

    public close() {
        if (!this.ref) {
            throw new Error('对话框未打开');
        }
        ReactDOM.unmountComponentAtNode(this.ref);
        this.ref = null;
    }
}

type SamplePortal = {
    onClick: () => void;
    counter: number;
};
const SamplePortal: React.FC<SamplePortal> = (props) => {
    return (
        <div>
            Sample Protal对话框
            <span style={{ color: 'red' }}>{props.counter}</span>
            <button onClick={props.onClick}>关闭</button>
        </div>
    );
};

const HelloReact: React.FC<any> = (props) => {
    const [state, setState] = useState(0);
    const data = useRef<MyPortal>();
    const counter = useRef<number>(0);
    return (
        <div>
            <h1>父组件</h1>
            <button
                onClick={() => {
                    if (data.current) {
                        return;
                    }
                    data.current = new MyPortal((protal) => {
                        const onClick = () => {
                            protal.close();
                            data.current = undefined;
                        };
                        return (
                            <SamplePortal
                                onClick={onClick}
                                counter={counter.current}
                            />
                        );
                    });
                    data.current.open();
                }}
            >
                显示Protal
            </button>
            <button
                onClick={() => {
                    if (data.current) {
                        data.current.close();
                        data.current = undefined;
                    }
                }}
            >
                隐藏Protal
            </button>
            <div>计算器：{counter.current}</div>
            <button
                onClick={() => {
                    counter.current++;
                    setState(state + 1);
                    //因为对话框是用命令的方式，而不是state的方式生成出来的。
                    //所以对话框依赖的数据变更了以后，需要手动触发rerender
                    if (data.current) {
                        data.current.rerender();
                    }
                }}
            >
                递增计数器
            </button>
        </div>
    );
};

export default HelloReact;
