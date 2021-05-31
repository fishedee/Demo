import React from 'react';
import { Layout , Menu, Icon ,Avatar ,Dropdown} from 'antd';
import style from './index.less'


const {SubMenu} = Menu;
const { Header, Content, Sider } = Layout;

export default class Navigator extends React.Component{
	state = {
		collapsed:true,
	}
	onCollapse = (collapsed)=>{
		 this.setState({ 
		 	collapsed:collapsed 
		 });
	}
	onSelect = (event)=>{
		this.props.onSelect(event.item.props.path);
	}
	explode = (str)=>{
		let result = str.split("/");
		let newResult = [];
		for( let i in result ){
			if( result[i] != ""){
				newResult.push(result[i]);
			}
		}
		return newResult;
	}
	getMatch = (url,path)=>{
		url = this.explode(url);
		path = this.explode(path);
		if( url.length < path.length ){
			return -1;
		}
		for( let i = 0 ;i != path.length ;i ++ ){
			if( url[i] != path[i] ){
				return -1;
			}
		}
		return path.length;
	}
	getSelectKey = (menus,key,url)=>{
		let maxMatch = {
			key:0,
			match:-1,
		}
		for( let i in menus ){
			let menu = menus[i];
			let children = menu.children || [];
			if( children.length != 0 ){
				let match = this.getSelectKey(children,key+i+",",url);
				if( match.match >= maxMatch.match ){
					maxMatch = match;
				}
			}else{
				let match = this.getMatch(url,menu.path);
				if( match >= maxMatch.match ){
					maxMatch = {
						key:key+i,
						match:match
					}
				}
			}
		}
		return maxMatch;
	}
	getMainMenuInner = (menus,key)=>{
		let subMenuItem = [];
		for( let i in menus ){
			let menu = menus[i];
			let children = menu.children || [];
			let item = null;
			if( children.length == 0 ){
				item = (<Menu.Item key={key+i} path={menu.path}>
					 {menu.icon?(<Icon type={menu.icon}/>):null}
              		<span>{menu.name}</span>
				</Menu.Item>);
			}else{
				let childrenItem = this.getMainMenuInner(children,key+i+",");
				item = (<SubMenu key={key+i} title={
					<span>{menu.icon?(<Icon type={menu.icon}/>):null}<span>{menu.name}</span></span>}>
					{childrenItem}
				</SubMenu>);
			}
			subMenuItem.push(item);
		}
		return subMenuItem;
	}
	getMainMenu = ()=>{
		const menu = this.props.menu;
		const selectKey = this.getSelectKey(menu,"",this.props.url);
		return (
			<Menu
	          mode="inline"
	          theme="dark"
	          selectedKeys={[selectKey.key]}
	          onSelect={this.onSelect}
	        >
	        	{this.getMainMenuInner(menu,'')}
	        </Menu>
		);
	}
	onSelectDropDown = (event)=>{
		event.item.props.onClick();
	}
	getDropdownMenu = ()=>{
		let menuItem = [];
		for( let i in this.props.login.dropdown ){
			let singleDropdown = this.props.login.dropdown[i];
			menuItem.push(
				<Menu.Item key={i} onClick={singleDropdown.onClick}>{singleDropdown.name}</Menu.Item>
			);
		}
		return (
		<Menu onSelect={this.onSelectDropDown}>
			{menuItem}
		</Menu>
		);
	}
	render = ()=>{
		return (
			<Layout className={style.root}>
				<Sider 
					className={style.sider} 
					collapsible={true} 
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}>
					<Dropdown overlay={this.getDropdownMenu()}>
						<div className={style.head}><Avatar icon="user" className={style.icon}/><div className={style.user}>{this.props.login.name}</div></div>
					</Dropdown>
					{this.getMainMenu()}
				</Sider>
				<Content className={style.content}>
					{this.props.children}
				</Content>
			</Layout>
		);
	}
}