import React from 'react';
import {Input} from 'antd';
import StandardTable from '@/components/StandardTable';
import style from './index.less';
import classname from 'classname';

const Search = Input.Search;

export default class MyTableList extends React.Component{
	state = {
		filterInput:'',
		list:[],
		visibleList:[],
		listMaxCount:20,
		listHeight:0,
		scrollTop:0,
	}
	search = null;
	tableNode = null;
	componentDidMount = ()=>{
		this.tableNode.addEventListener('scroll',()=>{
			this.state.scrollTop = this.tableNode.scrollTop;
			this.setState({});
		})
	}
	focus = ()=>{
		this.search.focus();
	}
	clear = ()=>{
		this.state.filterInput = '';
		this.setState({});
		this.resetSelectedRow();
	}
	onFilterChange = (event)=>{
		this.state.filterInput = event.target.value;
		this.setState({});
		this.resetSelectedRow();
	}
	resetSelectedRow = ()=>{
		this.filterRows();
		const list = this.state.list;
		if( list.length != 0 ){
			this.props.onChange(parseInt(list[0]['_tableSelectKey']));
		}
		this.state.listMaxCount = 20
		this.state.listHeight = 0;
		this.setState({});
	}
	onSelectedRowChange = (selectedRow)=>{
		this.props.onChange(parseInt(selectedRow));
	}
	onKeyDown = (event)=>{
		const totalHeight = 600
		const headHeight = 38
		const itemHeight = 38
		const list = this.state.list;
		let selectedRowIndex = list.findIndex((single)=>{
			return single['_tableSelectKey'] == this.props.value;
		});
		if( selectedRowIndex == -1 ){
			return;
		}
		if( event.keyCode == 13 ){
			event.preventDefault();
			this.props.onSelect(parseInt(this.props.value));
		}else if( event.keyCode == 38 &&
			selectedRowIndex > 0 ){
			//up
			selectedRowIndex --;
			let scrollTop = selectedRowIndex*itemHeight+headHeight;
			if( this.state.scrollTop > scrollTop ){
				this.tableNode.scrollTop = scrollTop
			}
			this.props.onChange(parseInt(list[selectedRowIndex]['_tableSelectKey']));
		}else if (event.keyCode == 40 &&
			selectedRowIndex < this.state.list.length - 1 ){
			//down
			selectedRowIndex ++;
			let scrollTop = (selectedRowIndex+1)*itemHeight+headHeight-totalHeight;
			if( this.state.scrollTop < scrollTop ){
				this.tableNode.scrollTop = scrollTop
			}
			this.props.onChange(parseInt(list[selectedRowIndex]['_tableSelectKey']));
		}
	}
	onRowDoubleClick = (selectedRow)=>{
		const list = this.state.list;
		let selectedRowIndex = list.findIndex((single)=>{
			return single['_tableSelectKey'] == this.props.value;
		});
		if( selectedRowIndex == -1 ){
			return;
		}
		this.props.onSelect(parseInt(this.props.value));
	}
	setVisibleList = ()=>{
		const data = this.state.list;
		const totalHeight = 600
		const headHeight = 38
		const itemHeight = 38
		const visibleCount = Math.ceil(totalHeight / itemHeight)+2;
		let firstIndex = 0;
		if( this.state.scrollTop < headHeight ){
			firstIndex = 0;
		}else{
			firstIndex = Math.floor((this.state.scrollTop - headHeight) / itemHeight);
			if( firstIndex - 1 >= 0 ){
				firstIndex = firstIndex - 1;
			}
		}
		let endIndex = firstIndex + visibleCount;
		if( endIndex >= data.length ){
			endIndex = data.length;
		}
		const visibleData = data.slice(firstIndex,endIndex);
		for( let i in visibleData ){
			let single = visibleData[i];
			let _style = {};
			if( i == 0 && firstIndex != 0 ){
				_style.height = (firstIndex*itemHeight+headHeight)+'px'
			}
			if( i == visibleData.length - 1 && endIndex != data.length){
				_style.height = (data.length - endIndex + 1 )*itemHeight+'px'
			}
			single._style = _style
		}
		this.state.visibleList = visibleData
	}
	filterRows = ()=>{
		const rows = this.props.rows;
		let list = [];
		for( const i in rows ){
			let single = rows[i];
			let shouldExist = this.props.filterRow(this.state.filterInput,single);
			if( shouldExist ){
				list.push({
					...single,
					'_tableSelectKey':parseInt(i),
				});
			}	
		}
		this.state.list = list;
		this.setVisibleList();
	}
	searchNode = null;
	onClick = ()=>{
		this.search.focus();
	}
	render = ()=>{
		this.filterRows();
		return (
		<div style={this.props.style} className={classname(style.container,this.props.className)} onClick={this.onClick}>
			<Search
				ref={(node)=>{this.search=node}}
				placeholder="搜索" 
				value={this.state.filterInput} 
				onChange={this.onFilterChange}
				onKeyDown={this.onKeyDown}/>
			<StandardTable
				getContainerRef={(node)=>{this.tableNode=node}}
				containerClassName={style.root}
				value={this.state.visibleList}
				loading={false}
				rowKey={'_tableSelectKey'}
				columns={this.props.renderRow}
				selectedRow={this.props.value}
				onSelectedRowChange={this.onSelectedRowChange}
				onRowDoubleClick={this.onRowDoubleClick}
				onRow={(data)=>{
					return {
						style:data._style
					}
				}}/>
		</div>
		);
	}

}