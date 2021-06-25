import React from 'react';

export default class App extends React.Component{
    constructor() {
        super();
    }
     componentDidMount() {
        document.addEventListener('click', () => {
           console.log('document click')
        })
        document.getElementById('div1').addEventListener('click', () => {
			console.log('原生outClick')
        })
    }
    outerClick(e){
        console.log('outerClick')
    }
    innerClick(e){
        console.log('innerClick');
        //这个方法只能阻止合成事件，不能阻止原生事件
        e.stopPropagation();
    }
    render(){
    	//http://www.qiutianaimeili.com/html/page/2020/04/2020426gbkc8mhwpfi.html
    	/*
    	因此我们点击inner的div的时候，输出是：
    	原生outClick
        innerClick
        document click
        这个时候，少了outerClick这个合成事件的触发
    	*/
        return(
            <div id="div1" onClick={this.outerClick.bind(this)}>
    this is outer
    <div onClick={this.innerClick.bind(this)}>this is inner</div>
            </div>
        )
    }
}