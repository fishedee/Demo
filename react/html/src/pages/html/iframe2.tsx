import { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';

const divTest: React.FC<any> = (props) => {
    const frameRef = useRef(null as unknown as HTMLIFrameElement);
    useEffect(() => {
        frameRef.current.contentWindow?.document.write('<p>欢迎<span style="color:red;">fish</p>');
    }, []);
    return (
        <div>
            <h1>{'Div的dangerHtml测试'}</h1>
            <Button onClick={() => {
                let result = '<div>';
                for (var i = 0; i != 100; i++) {
                    result += `<p>欢迎<span style="color:blue;">cat${i}</p>`
                }
                result += "</div>";
                //write是续写，要先调用close清除数据
                frameRef.current.contentWindow?.document.close();
                frameRef.current.contentWindow?.document.write(result);
            }}>切换</Button>
            <div style={{ width: '100%', height: '500px', border: '1px solid black' }}>
                <iframe ref={frameRef} style={{ width: '100%', height: '100%', border: 0 }} />
            </div>
        </div>
    );
}

export default divTest;