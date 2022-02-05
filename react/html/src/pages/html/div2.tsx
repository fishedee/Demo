import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

const divTest: React.FC<any> = (props) => {
    const divRef = useRef(null as unknown as HTMLDivElement);
    useEffect(() => {
        divRef.current.innerHTML = '<p>欢迎<span style="color:red;">fish</p>';
    }, []);
    return (
        <div>
            <h1>{'Div的dangerHtml测试'}</h1>
            <Button onClick={() => {
                divRef.current.innerHTML = '<p>欢迎<span style="color:blue;">cat</p>';
            }}>切换</Button>
            <div ref={divRef}></div>
        </div>
    );
}

export default divTest;