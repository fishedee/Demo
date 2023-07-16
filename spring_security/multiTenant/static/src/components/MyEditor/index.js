import React from 'react';
import style from './index.less';
import customRequest from '../MyUploadImage/customRequest';
import {ueditor} from '@/utils/constant';
import ImageCompressor from 'image-compressor.js';
import loadScript from 'load-script';

let globalUeditorId = 10001;
export default class MyEditor extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ueditorId:globalUeditorId+'',
			content:'',
		};
		this.ueditor = null;
		this.ueditorReady = false;
		this.timer = null;
		globalUeditorId++
	}
	createScript = (url)=> {
		let scriptTags = window.document.querySelectorAll('script');
		let len = scriptTags.length
		let i = 0
		let _url = location.origin + url
		return new Promise((resolve, reject) => {
			for (i = 0; i < len; i++) {
				var src = scriptTags[i].src
					if (src && src === _url) {
					scriptTags[i].parentElement.removeChild(scriptTags[i])
				}
			}
			url = location.origin + url;
			loadScript(url,function(err,script){
				if( err ){
					reject( new Error('动态加载脚本文件失败：'+url));
					return;
				}
				resolve();
			});
		})
	}
	componentDidMount = async ()=>{
		if (!window.UE ) {
			window.UEDITOR_HOME_URL = ueditor.path+'/';
			await this.createScript(ueditor.path + '/ueditor.config.js');
			await this.createScript(ueditor.path + '/ueditor.all.min.js')
			this.initEditor();
		}else{
			this.initEditor();
		}
	}
	initEditor = ()=>{
		let {config, onChange, getRef} = this.props;
		config = {
			...config,
			serverUrl:ueditor.serverUrl,
		}
		this.ueditor = window.UE.getEditor(this.state.ueditorId, config);
		if( getRef ){
			getRef(ueditor);
		}
		this.ueditor.ready(()=>{
			this.ueditorReady = true;
			this.ueditor.setHeight(400);
			this.setState({});
			this.timer = setInterval(()=>{
				var newContent = this.ueditor.getContent();
				if( newContent != this.state.content ){
					this.state.content = newContent;
					onChange(this.state.content);
				}
			},500);
		});
	}
	componentWillUnmount = ()=>{
		if( this.ueditor ){
			this.ueditor.destroy();
			this.ueditor = null;
		}
		if( this.timer ){
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	render (){
		let {value} = this.props;
		if( !value ){
			value = '';
		}
		if( value != this.state.content &&
			this.ueditorReady ){
			this.state.content = value;
			setTimeout(()=>{
				this.ueditor.setContent(value);
			},0);
		}
		return (
		<div className={style.root}>
			<script 
				style={{width:'100%'}}
				id={this.state.ueditorId}
				name={this.state.ueditorId}
				type="text/plain"/>
		</div>
		);
	}
}