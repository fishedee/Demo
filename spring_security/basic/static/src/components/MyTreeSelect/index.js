import React from 'react';
import { TreeSelect } from 'antd';
import style from './index.less';
import classname from 'classname';

const TreeNode = TreeSelect.TreeNode;

export default class MyTreeList extends React.Component{
	onChange = (data)=>{
		if( data == '_all'){
			data = undefined;
		}else{
			data = parseInt(data);
		}
		this.props.onChange(data);
	}
	renderNode = (root)=>{
		let renderNode = this.props.renderNode || function(data){
			return data.name;
		}
		let childNodes = [];
		for( let i in root.children ){
			let singleChild = root.children[i];
			childNodes.push(this.renderNode(singleChild));
		}
		if( root.id == '_all' ){
			return (
				<TreeNode title={'全部'} data={{}} key={'_all'} value={'_all'}>
					{childNodes}
				</TreeNode>
			);
		}else{
			if( childNodes.length == 0 ){
				return (<TreeNode title={renderNode(root.data)} data={root.data} key={root.id} value={root.id} isLeaf={true}/>);
			}else{
				return (
					<TreeNode title={renderNode(root.data)} data={root.data} key={root.id} value={root.id}>
						{childNodes}
					</TreeNode>
				);
			}
		}
	}
	buildNode = (children,current)=>{
		let childNode = children[current] || [];
		for( let i in childNode ){
			childNode[i].children = this.buildNode(children,childNode[i].id);
		}
		return childNode;
	}
	renderTreeNode = ()=>{
		const nodes = this.props.nodes;
		let children = {};
		for( let id in nodes ){
			let single = nodes[id];
			let parent = 0;
			if( !single.parent ){
				parent = '_all';
			}else{
				parent = single.parent;
			}
			if( !children[parent] ){
				children[parent] = [];
			}
			children[parent].push({
				id:id,
				data:single
			});
		}
		let root = {
			id:'_all',
			children:this.buildNode(children,'_all'),
			data:{}
		};
		return this.renderNode(root);
	}
	render = ()=>{
		let showSearch = this.props.showSearch;
		let placeholder = this.props.placeholder;
		let value = this.props.value;
		let nodes = this.props.nodes;
		let renderNode = this.props.renderNode || function(data){
			return data.name;
		}
		let filterNode = this.props.filterNode || function(value,data){
			return renderNode(data).indexOf(value) != -1;
		}
		if( !nodes['0'] ){
			//options没有0值时，0和undefined等同
			if( !value ){
				value = undefined;
			}else{
				value = value+'';
			}
		}else{
			if( value == undefined ){
				value = undefined;
			}else{
				value = value+'';
			}
		}
		return (
		<TreeSelect
			placeholder={placeholder}
			filterTreeNode={(value,treeNode)=>{
				if( treeNode.props.value == '_all'){
					return false;
				}
				return filterNode(value,treeNode.props.data)}
			}
			treeDefaultExpandedKeys={['_all']}
			onChange={this.onChange}
			allowClear={true}
			showSearch={showSearch}
			dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
			value={value}
			onChange={this.onChange}
		>
			{this.renderTreeNode()}
		</TreeSelect>
		);
	}
}