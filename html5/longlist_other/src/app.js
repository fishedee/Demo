import React from 'react'
import InfiniteLoader from './list';
import style from './'
class MM extends React.Component{
	render(){
		return <div>{this.props.data.name}</div>;
	}
}
let list = [];
for( var i = 0 ;i != 1000 ;i ++ ){
	list.push({
		id:i,
		name:'fish_'+i
	});
}
export default class App extends React.Component{
	state = {
		list:list
	};
	rootNode = null;
	componentDidMount = ()=>{
		this.setState({});
	}
	onLoad = (d)=>{
		this.setState({});
	}
	getContainer = (el)=>{
		return el;
	}
	render(){
		return (
			<InfiniteLoader
				className={"container"}
				template={MM}
				data={this.state.list}
				sliceSize={20}
				onLoad={this.onLoad}
				keyProp={"id"}
				isDrained={false}
				getContainer={this.getContainer}
			/>
		);
	}
}