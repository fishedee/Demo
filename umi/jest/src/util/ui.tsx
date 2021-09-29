import React from 'react';

type ButtonProps = {
    title:string;
    onClick?:()=>void;
}
const Button:React.FC<ButtonProps> = (props)=>{

    return (<button onClick={props.onClick}>{props.title}</button>);
}

type ButtonList = {
    title:string;
    list:ButtonProps[]
}

const ButtonList:React.FC<ButtonList> = (props)=>{
    return (<div>
        <h2>{props.title}</h2>
        {props.list.map((single,index)=>{
            return (<Button key={index} {...single}/>);
        })}
    </div>);
}

export {
    Button,
    ButtonList
};