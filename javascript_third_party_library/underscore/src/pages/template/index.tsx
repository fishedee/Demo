import { useEffect, useRef, useState } from 'react';
import _ from 'underscore';
import { Button } from 'antd';

const tpl = `
<div>
    <h1><%= title %></h1>
    <!--等于号没有转义-->
    <div><%= html %></div>
    <!--减号有转义-->
    <div><%- html %></div>
    <ul>
        <% for(var i in list ){ var single = list[i]%>
            <li><%= single.name %> - <%= single.id %></li> 
        <% } %>
    </ul>
    <% if(age >= 100 ){ %>
        <h3>Very old <%= age %></h3>
    <% }else{ %>
        <h3>normal age <%= age %></h3>
    <% }%>
</div>
`

const tplRender = _.template(tpl);

const templatePage: React.FC<any> = (props) => {
    const [state, setState] = useState(0);
    const refData = useRef({
        html: '', data: {
            title: '标题',
            html: '<p>你好<span style="color:red;">xxx</p>',
            list: [
                {
                    name: 'fish',
                    id: 10001,
                },
                {
                    name: 'age',
                    id: 10002,
                }
            ],
            age: 28,
        }
    });
    useEffect(() => {
        refData.current.html = tplRender(refData.current.data);
        setState((v) => v + 1);
    }, []);
    const toggleAge = () => {
        let currentData = refData.current.data;
        if (currentData.age >= 100) {
            currentData.age = 28;
        } else {
            currentData.age = 128;
        }
        refData.current.html = tplRender(refData.current.data);
        setState((v) => v + 1);
    }
    return (
        <div>
            <div><Button onClick={toggleAge}>{'切换age'}</Button></div>
            <div dangerouslySetInnerHTML={{ __html: refData.current!.html }}></div>
        </div>
    );
}

export default templatePage;