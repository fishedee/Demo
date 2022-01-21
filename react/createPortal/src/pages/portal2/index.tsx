import React, { useEffect, useRef, useState } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

const HelloFromPortal: React.FC<any> = (props) => {
    return <div>Protal对话框</div>;
};

const AmISameAsPortal: React.FC<any> = (props) => {
    return <div>Not Portal对话框</div>;
};

const HelloReact: React.FC<any> = (props) => {
    let [firstPortalShow, setFirstPortalShow] = useState(false);
    let data = useRef({
        isShow: false,
        ref: document.getElementById('another-container')!,
    });
    const hiddenDialog = () => {
        ReactDOM.unmountComponentAtNode(data.current.ref);
        data.current.isShow = false;
    };
    const showDialog = () => {
        ReactDOM.render(<AmISameAsPortal />, data.current.ref);
        data.current.isShow = true;
    };
    return (
        <div>
            <h1>父组件</h1>
            <button
                onClick={() => {
                    if (firstPortalShow == true) {
                        setFirstPortalShow(false);
                    } else {
                        setFirstPortalShow(true);
                    }
                }}
            >
                是否显示Protal
            </button>
            <div>
                {
                    //createPortal的另外一个好处是，可以套用state的方式来控制是否显示该节点。
                    firstPortalShow
                        ? createPortal(
                              <HelloFromPortal />,
                              document.getElementById('another-root')!,
                          )
                        : null
                }
            </div>
            <button
                onClick={() => {
                    //ReactDOM.render的方式就是只能为命令式的
                    if (data.current.isShow == false) {
                        showDialog();
                    } else {
                        hiddenDialog();
                    }
                }}
            >
                是否显示NotProtal
            </button>
        </div>
    );
};

export default HelloReact;
