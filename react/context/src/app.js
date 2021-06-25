import React from 'react';
const {Provider, Consumer} = React.createContext({mm:1});

class GrandSon extends React.Component{
    //错误用法，只在本地修改value，导致只有一个GrandSon被更新了状态
    onClick = (data)=>{
        data.mm++;
        this.setState({});
    }
    render(){
    	return (
        <Consumer>
            {
                (data)=>{
                    return (<div>
                        <span>{data.mm}</span>
                        <button onClick={this.onClick.bind(this,data)}>点击</button>
                    </div>);
                }
            }
        </Consumer>
        );
    }
}

class Son extends React.Component{
    render(){
        return (
        <div>
            <GrandSon/>
            <GrandSon/>
        </div>
        );
    }
}



export default class App extends React.Component{
    render(){
        return (
        <Provider value={{mm:1}}>
            <h1>我是标题</h1>
            <Son/>
        </Provider>
        );
    }
}