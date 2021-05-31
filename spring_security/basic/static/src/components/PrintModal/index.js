import React from 'react';
import { Modal ,Button,Tabs,Radio,Switch} from 'antd';
import style from './index.less';
import classname from 'classname';
import html2canvas from 'html2canvas';
const TabPane = Tabs.TabPane;

class PrintPreview extends React.Component{
	frameNodeList = [];
	canvasNodeList = [];
	constructor(props){
		super(props);
		for( const i in this.props.pages){
			this.frameNodeList.push(null);
			this.canvasNodeList.push(null);
		}
		this.state = {
			activeKey:'0',
			showMode:true,
		}
	}
	componentDidMount = ()=>{
		for( const i in this.props.pages ){
			var docText = this.props.pages[i];
			var win = this.frameNodeList[i].contentWindow;
			var doc = win.document;
			doc.open();
			doc.write(docText);
			doc.close();
		}
	}
	getNode = (index,node)=>{
		this.frameNodeList[index] = node;
	}
	getCanvasNode = (index,node)=>{
		this.canvasNodeList[index] = node;
	}
	printCurrent = ()=>{
		var win = this.frameNodeList[this.state.activeKey].contentWindow;
		win.print();
	}
	printAll = ()=>{
		for( const i in this.frameNodeList ){
			var win = this.frameNodeList[i].contentWindow;
			win.print();
		}
	}
	loadCanvas = (index)=>{
		var win = this.frameNodeList[index].contentWindow;
		var canvas = this.canvasNodeList[index];
		var shareContent = win.document.getElementById('body');
	    var width = shareContent.offsetWidth;
	    var height = shareContent.offsetHeight;
	    var scale = 2;
	    canvas.width = width * scale;
	    canvas.height = height * scale;
	    canvas.getContext("2d").scale(scale, scale);
	    var opts = {
	        scale: scale,
	        canvas: canvas,
	        width: width,
	        height: height,
	        useCORS: true
	    };

		html2canvas(shareContent,opts);
	}
	onChange = (activeKey)=>{
		this.state.activeKey = activeKey;
		this.setState({});
	}
	onShowModeChange = (e)=>{
		this.state.showMode = e;
		this.setState({});
	}
	render = ()=>{
		var prefix = this.props.prefix;
		var frameShow = '';
		var canvasShow = '';
		if( this.state.showMode == false ){
			canvasShow = style.hidden;
		}else{
			frameShow = style.hidden;
		}
		return (
		<div className={style.container}>
			<div className={style.header}>
				<Switch 
					className={style.showMode} 
					checkedChildren="图片模式" 
					unCheckedChildren="网页模式" 
					checked={this.state.showMode}
					onChange={this.onShowModeChange}/>
				{prefix}
			</div>
			<Tabs
	          activeKey={this.state.activeKey}
	          onChange={this.onChange}
	          tabPosition={'top'}
	        >
	        	{this.props.pages.map((doc,index)=>{
	        		return (
	        			<TabPane tab={"第"+(index+1)+"页"} key={index} forceRender={true}>
								<div className={style.canvasWrapper}>
									<canvas 
										ref={this.getCanvasNode.bind(this,index)}
										className={classname(style.canvas,canvasShow)}/>
								</div>
								<iframe 
									ref={this.getNode.bind(this,index)}
									onLoad={this.loadCanvas.bind(this,index)}
									className={classname(style.frame,frameShow)}
									frameBorder="0"
								/>
			        	</TabPane>
	        		);
	        	})}
	        </Tabs>
        </div>
		);
	}
}

class PrintPreviewWrapper extends React.Component{
	node = null;
	constructor(props){
		super(props);
		this.state = {
			printStyle:0,
		}
	} 
	printCurrent = ()=>{
		this.node.printCurrent();
	}
	printAll = ()=>{
		this.node.printAll();
	}
	onPrintStyleChange = (e)=>{
		this.state.printStyle = e.target.value;
		this.setState({});
	}
	render = ()=>{
		let {documents} = this.props;
		let pages = documents[this.state.printStyle].pages;
		return (<PrintPreview 
			ref={(node)=>(this.node=node)}
			key={this.state.printStyle}
			prefix={
				<Radio.Group 
					onChange={this.onPrintStyleChange} 
					value={this.state.printStyle} 
					buttonStyle="solid">
					{documents.map((doc,index)=>{
						return (<Radio.Button 
							key={index} 
							value={index}>
							{doc.name}
						</Radio.Button>);
					})}
				</Radio.Group>
			}
			pages={pages}/>);
	}
}
export default class PrintModal extends React.Component{
	node = null
	onCancel = ()=>{
		this.props.onClose();
	}
	printCurrent = ()=>{
		this.node.printCurrent();
		if( this.props.onPrint ){
			this.props.onPrint('current');
		}
	}
	printAll = ()=>{
		this.node.printAll();
		if( this.props.onPrint ){
			this.props.onPrint('all');
		}
	}
	render = ()=>{
		var {width,visible,onClose,...resetProps} = this.props;
		width = width || '75%'; 
		return (
			<Modal
				title="打印预览"
				visible={visible}
				onCancel={this.onCancel}
				maskClosable={false}
				destroyOnClose={true}
				footer={null}
				width={width}
				footer = {[
					<Button key="submit2" type="primary" onClick={this.printAll}>
		              全部打印
		            </Button>,
					<Button key="submit1" key="submit" onClick={this.printCurrent}>
		              本页打印
		            </Button>,
					<Button key="back" onClick={this.onCancel}>取消</Button>,
				]}
				wrapClassName={style.printDialog}>
				<PrintPreviewWrapper 
					ref={(node)=>(this.node=node)}
					{...resetProps}/>
			</Modal>
		);
	}
}