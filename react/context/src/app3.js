import React from 'react';
const {Provider, Consumer} = React.createContext({mm:1});

//参考这里：https://zhuanlan.zhihu.com/p/50336226
class MMProvider extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            mm:1
        };
    }
    setMM(newValue){
        this.setState({
            mm:newValue,
        });
    }
    render(){
        //使用this.props.children的方法，我们可以做到只需要触发render consumer方法即可
        return (
        <Provider value={{mm:this.state.mm,setMM:this.setMM.bind(this)}}>
            {this.props.children}
        </Provider>
        );
    }
}
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
    render(){
        console.log("render app");
        return (
            <MMProvider>
                <h1>我是标题</h1>
                <Son/>
            </MMProvider>
        );
    }
}