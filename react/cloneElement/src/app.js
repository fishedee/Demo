import React from 'react';

class Item extends React.Component{
    constructor() {
        super();
    }
    render(){
    	return (<div>{this.props.value}</div>);
    }
}

class Container extends React.Component{
    render(){
        var result = [];
        for( var i in this.props.data ){
            var single = this.props.data[i];
            var singleElem = this.props.renderItem();
            //提供通用修改属性的能力
            singleElem =  React.cloneElement(singleElem,{
                key:i,
                value:"++++"+single+"++++",
            });
            result.push(singleElem);
        }
        return (
            <div>{result}</div>
        );
    }
}

export default class App extends React.Component{
    render(){
        let data = ["1","2","3"];
        return (<Container renderItem={(node)=>(<Item/>)} data={data}/>);
    }
}