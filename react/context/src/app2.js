import React from 'react';
const {Provider, Consumer} = React.createContext({mm:1});

class GrandSon extends React.PureComponent{
    //正确用法，使用setter方法来更新数据
    onClick = (data)=>{
        data.setMM(data.mm+1);
    }
    render(){
        console.log("render grandson");
    	return (
        <Consumer>
            {
                (data)=>{
                    console.log("render consumer");
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

class Son extends React.PureComponent{
    render(){
        console.log("render son");
        return (
        <div>
            <GrandSon/>
            <GrandSon/>
        </div>
        );
    }
}



export default class App extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            mm:1
        };
    }
    setMM(newValue){
        //缺点在于，每次setState都将重复计算一次render App
        this.setState({
            mm:newValue,
        });
    }
    //value不仅传递一个mm变量，还传递了一个setter方法
    render(){
        console.log("render app");
        return (
        <Provider value={{mm:this.state.mm,setMM:this.setMM.bind(this)}}>
            <h1>我是标题</h1>
            <Son/>
        </Provider>
        );
    }
}