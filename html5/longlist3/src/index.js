import './index.css'
import React from 'react';
import ReactDom from 'react-dom';
/*
// 列表元素高度
const ITEM_HEIGHT = 31
// 列表元素个数
const ITEM_COUNT = 500

window.onload = function () {
    const container = document.querySelector('#container')
    const containerHeight = container.clientHeight
    const list = document.querySelector('#list')
    // 一屏可以渲染下的元素个数
    const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT)
    const placeholder = document.querySelector('#content-placeholder')
    // 首次渲染
    const refreshList = function(from ,to){
    	list.innerHTML = '';
    	list.appendChild(renderNodes(from, to))
    	let centerCount = to-from;
    	let paddingTop = from*ITEM_HEIGHT;
    	let paddingBottom = (ITEM_COUNT - to )*ITEM_HEIGHT;
    	list.style.paddingTop = paddingTop + 'px';
    	list.style.paddingBottom = paddingBottom+'px';
    }
    
    refreshList(0,visibleCount);
    container.addEventListener('scroll', function() {
        const firstIndex = Math.floor(container.scrollTop / ITEM_HEIGHT)
        refreshList(firstIndex, firstIndex + visibleCount);
    })
}

function renderNodes(from, to) {
    const fragment = document.createDocumentFragment()
    for (let i = from; i < to; i++) {
        const el = document.createElement('li')
        el.innerHTML = i + 1
        fragment.appendChild(el)
    }
    return fragment
}
*/

class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			scrollTop:0,
		}
	}
	containerNode = null
	componentDidMount = ()=>{
		console.log(this.containerNode);
		this.containerNode.addEventListener('scroll',()=>{
			this.state.scrollTop = this.containerNode.scrollTop;
			this.setState({});
		})
	}
	render = ()=>{
		let data = this.props.data;
		let height = this.props.height;
		let itemHeight = this.props.itemHeight;
		let divs = [];
		const visibleCount = Math.ceil(height / itemHeight);
		const firstIndex = Math.floor(this.state.scrollTop / itemHeight);
		const endIndex = firstIndex + visibleCount+1;
		const visibleData = data.slice(firstIndex,endIndex);
		for( let i in visibleData ){
			let single = visibleData[i];
			divs.push(<li key={single.key}>{this.props.renderItem(single)}</li>);
		}
		
		let style1 = {
			height:height+"px",
			overflow:"scroll",
		}
		let style2 = {
			paddingTop:firstIndex*itemHeight+'px',
			paddingBottom:(data.length - endIndex)*itemHeight+'px',
		};
		return (<div style={style1} ref={(node)=>(this.containerNode=node)}>
			<ul style={style2}>{divs}</ul>
		</div>);
	}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list:[],
		}
	}
	componentDidMount = ()=>{
		for( var i = 0 ;i != 1000; i++){
			this.state.list.push({
				key:i,
				name:"fish_"+i,
			});
		}
		this.setState({});
	}
	render = ()=>{
		return (<List 
			data={this.state.list}
			height={400} 
			itemHeight={31}
			renderItem={(data)=>(data.name)}/>);
	}
}

ReactDom.render(
	<App/>,
	document.getElementById('root')
);