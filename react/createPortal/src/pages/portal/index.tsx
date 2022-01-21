import React, { useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

const HelloFromPortal: React.FC<any> = (props) => {
    return (
        <div
            onClick={() => {
                alert('我爸应该知道我被点击了');
            }}
        >
            我是传送门里出来的Portal
        </div>
    );
};

const AmISameAsPortal: React.FC<any> = (props) => {
    return (
        <div
            onClick={() => {
                alert('是不是从传送门里出来呢？ 我妈应该知道我被点击了');
            }}
        >
            是不是从传送门里出来呢？ not Portal
        </div>
    );
};

const HelloReact: React.FC<any> = (props) => {
    useEffect(() => {
        //render是没有返回值的
        //只有AmISameAsPortal自身会响应，虚拟节点上没有父节点，不能响应
        ReactDOM.render(
            <AmISameAsPortal />,
            document.getElementById('another-container')!,
        );
    }, []);
    return (
        <div>
            <h1>父组件</h1>
            <div
                onClick={() => {
                    alert('YES  Dispaly');
                }}
            >
                {
                    //createPortal是有返回值的，它在指定DOM节点上渲染数据，但是挂载在虚拟的DOM节点下面。
                    //所以，能看到一个神奇的现象，点击指定DOM节点上的标记，
                    //不仅HelloFromPortal会响应，虚拟节点的父节点也会响应
                    createPortal(
                        <HelloFromPortal />,
                        document.getElementById('another-root')!,
                    )
                }
            </div>
            XXXX XXXX
            <div
                onClick={() => {
                    alert('No display');
                }}
            ></div>
        </div>
    );
};

export default HelloReact;
