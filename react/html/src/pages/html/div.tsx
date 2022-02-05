import { useState } from 'react';
import { Button } from 'antd';

const divTest: React.FC<any> = (props) => {
    const [state, setState] = useState('<p>欢迎<span style="color:red;">fish</p>');
    return (
        <div>
            <h1>{'Div的dangerHtml测试'}</h1>
            <Button onClick={() => {
                setState('<p>欢迎<span style="color:blue;">cat</p>');
            }}>切换</Button>
            <div dangerouslySetInnerHTML={{ __html: state }}></div>
        </div>
    );
}

export default divTest;