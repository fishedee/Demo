import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react';

//函数与类组件
const ComponentA:React.FC<{title:string}> = (props)=>{
    return (<h1>{props.title}</h1>);
}

class ComponentB extends React.Component<{size:number}>{
    render(){
        return (<div>{this.props.size}</div>);
    }
}

//使用Typescript获取组件的props，这个很好用
type componentAProps = React.ComponentProps<typeof ComponentA>;

type componentBProps = React.ComponentProps<typeof ComponentB>;

//函数与类组件都属于JSXElementConstructor
function componentConstructor(data: JSXElementConstructor<any>){
    
}
componentConstructor(ComponentA);
componentConstructor(ComponentB);

//凡是组件都能返回JSXElement（等价于ReactElement），而字符串和数字等等都不属于ReactElement
const element1:ReactElement = <ComponentA title={"13"}/>
//const element2:ReactElement = "23"
//const element3:ReactElement = 123

//而ReactNode是更为基础的渲染元素了，唯一的缺点在于ReactNode不能使用cloneElement等的方法
const node1:ReactNode = <ComponentA title={"13"}/>
const node2:ReactNode = "string"
const node3:ReactNode = 123
const node4:ReactNode = null
const node5:ReactNode = undefined