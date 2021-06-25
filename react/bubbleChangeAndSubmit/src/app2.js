import React from 'react';

export default class App extends React.Component{
    constructor() {
        super();
    }
     componentDidMount() {
    }
    outerChange(e){
        console.log('outerChange',e.target.value)
    }
    innerChange(e){
        console.log('innerChange',e.target.value);
    }
    render(){
        //普通的div也可以接收onChange冒泡事件。
        return(
            <div id="div1" onChange={this.outerChange.bind(this)}>
                this is outer
                <input onChange={this.innerChange.bind(this)}/>
            </div>
        )
    }
}