import './index.css'
import React from 'react';
import ReactDom from 'react-dom';

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
		const visibleCount = Math.ceil(height / itemHeight)+1;
		const firstIndex = Math.floor(this.state.scrollTop / itemHeight);
		const endIndex = firstIndex + visibleCount;
		const visibleData = data.slice(firstIndex,endIndex);
		for( let i in visibleData ){
			let single = visibleData[i];
			let style = {};
			if( i == 0 ){
				style = {marginTop:firstIndex*itemHeight+'px'}
			}else if( i == visibleData.length - 1 ){
				style = {marginBottom:(data.length - endIndex)*itemHeight+'px'}
			}else{
				style = {}
			}
			divs.push(<li key={single.key} style={style}>{this.props.renderItem(single)}</li>);
		}
		
		let style = {
			height:height+"px",
			"overflowY":"auto",
			"overflowX":"hidden"
		}
		return (<ul style={style} ref={(node)=>(this.containerNode=node)}>{divs}</ul>);
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
		for( var i = 0 ;i != 100000; i++){
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