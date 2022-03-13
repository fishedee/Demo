import React from 'react';

const Item:React.FC<{value:string}> = (props)=>{
    return (<div>{props.value}</div>);
}

const Container:React.FC<{}> = (props)=>{
    const data = ["1","2","3"];
    
    let result = [];
    for( var i in data ){
        var single = data[i];
        //提供通用修改属性的能力
        let singleElem =  React.cloneElement(<Item value=""/>,{
            key:i,
            value:"++++"+single+"++++",
        });
        result.push(singleElem);
    }
    return (
        <div>{result}</div>
    );
}

export default Container;