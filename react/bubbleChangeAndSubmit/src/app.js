import React from 'react';

export default class App extends React.Component{
    constructor() {
        super();
    }
     componentDidMount() {
    }
    outerClick(e){
        console.log('outerClick');
    }
    innerClick(e){
        console.log('innerClick');
    }
    render(){
        //onClick事件的bubble
        return(
            <div id="div1" onClick={this.outerClick.bind(this)}>
    this is outer
    <button onClick={this.innerClick.bind(this)}>this is 按钮</button>
            </div>
        )
    }
}