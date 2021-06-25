import React from 'react';

export default class App extends React.Component{
    constructor() {
        super();
    }
     componentDidMount() {
     	//React事件有两步
     	//原生事件冒泡，从底层一起触发到document的冒泡
     	//合成事件冒泡，React创建的事件，从React底层组件到React顶层组件的冒泡。合成事件绑定是通过隐式绑定document的原生事件来实现的。
     	//所以，事件的方式是底层原生事件->document第一次隐式绑定事件（合成事件冒泡）->document第二次显式绑定的事件
     	/*
     	合成事件的意义在抹平不同浏览器上的事件差异，而且避免在列表的每个DOM上都挂载一个事件，造成灾难
     	*/
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
    }
    render(){
    	//http://www.qiutianaimeili.com/html/page/2020/04/2020426gbkc8mhwpfi.html
    	/*
    	因此我们点击inner的div的时候，输出是：
    	原生outClick
		innerClick
		outerClick
		document click
    	*/
        return(
            <div id="div1" onClick={this.outerClick.bind(this)}>
    this is outer
    <div onClick={this.innerClick.bind(this)}>this is inner</div>
            </div>
        )
    }
}