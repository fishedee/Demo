import { useState } from 'react';
import { Button } from 'antd';

const divTest: React.FC<any> = (props) => {
    const [state, setState] = useState('<p>欢迎<span style="color:red;">fish</p>');
    return (
        <div>
            <h1>{'Div的dangerHtml测试'}</h1>
            <Button onClick={() => {
                let result = '<div>';
                for (var i = 0; i != 100; i++) {
                    result += `<p>欢迎<span style="color:blue;">cat${i}</p>`
                }
                result += "</div>";
                setState(result);
            }}>切换</Button>
            <div style={{ width: '100%', height: '500px', border: '1px solid black' }}>
                <iframe style={{ width: '100%', height: '100%', border: 0 }} srcDoc={state} />
            </div>
        </div>
    );
}

export default divTest;