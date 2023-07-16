import React from 'react';
import styles from './index.less';
import { Icon ,Badge,Dropdown,List, Avatar } from 'antd';

export default class PageHeader extends React.Component{
  getDropdownMenu = ()=>{
    if( !this.props.notice ){
      return null;
    }
    let notifyList = this.props.notice;
    let items = notifyList.map((item,i) => (
      <List.Item key={i} className={styles.item} onClick={item.onClick}>
        <List.Item.Meta
          className={styles.meta}
          avatar={<Avatar shape="square" icon={item.icon}/>}
          title={
            <div className={styles.title}>
              {item.title}
            </div>
          }
          description={
            <div>
              <div className={styles.description} title={item.description}>
                {item.description}
              </div>
            </div>
          }
        />
      </List.Item>
    ));
    if( items.length == 0 ){
      items = null;
    }
    return (<div><List
      className={styles.list}
      locale={{emptyText:"暂无提醒消息"}}>
      {items}
    </List></div>);
  }
	render(){
    let menu = this.getDropdownMenu();
		return (<div className={styles.root}>
			<div className={styles.header}>
				{this.props.hasBack?<div className={styles.back} onClick={this.props.onBack}><Icon type="left"/>返回</div>:null}
				<h1 className={styles.title}>{this.props.title}</h1>
				{menu?<Dropdown 
					trigger={['click']}
					overlay={menu} 
          overlayClassName={styles.container}
					placement="bottomRight">
					<div className={styles.notify}>
						<Badge dot={this.props.notice.length!=0?true:false}><Icon type="bell"/></Badge>
					</div>
				</Dropdown>:null}
				<div className={styles.reload} onClick={this.props.onReload}><Icon type="reload"/></div>
			</div>
			<div className={styles.content}>{this.props.children}</div>
		</div>);
	}
}