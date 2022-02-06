import axios from 'axios';
import { Space, Button } from 'antd';
import { useState } from 'react';
import qs from 'qs';

const AxiosBasicTest: React.FC<any> = (props) => {
    const [state, setState] = useState('');
    const get = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/normal/get',
                params: {
                    name: "fish",
                }
            });
            setState(JSON.stringify(response, null, 4));
        } catch (e) {
            alert(e);
        }
    }
    const postForm = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/normal/postForm',
                data: qs.stringify({
                    name: "fish",
                    age: 110,
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            });
            setState(JSON.stringify(response, null, 4));
        } catch (e) {
            alert(e);
        }
    }
    const postJson = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/normal/postJson',
                data: {
                    name: "fish",
                    age: 110,
                }
            });
            setState(JSON.stringify(response, null, 4));
        } catch (e) {
            alert(e);
        }
    }
    return (
        <div>
            <Space>
                <Button onClick={get}>{'GET请求'}</Button>
                <Button onClick={postForm}>{'POST form表单'}</Button>
                <Button onClick={postJson}>{'POST Json表单'}</Button>
            </Space>
            <textarea
                style={{ width: '100%', height: '500px', border: '1px solid black' }}
                value={state}
                onChange={() => { }}
                disabled={true}
            />
        </div>
    );
}

export default AxiosBasicTest;