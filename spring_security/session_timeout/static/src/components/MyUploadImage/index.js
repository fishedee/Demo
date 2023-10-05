import React from 'react';
import { Upload, Icon, message,Button ,notification ,Card } from 'antd';
import style from './index.less';
import {uploadImage} from '@/utils/constant';
import customRequest from './customRequest';
import ImageCompressor from 'image-compressor.js';

const Dragger = Upload.Dragger;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function sleep(timeout){
  return new Promise(function(resolve,reject){
    setTimeout(resolve,timeout); 
  })
}
export default class Avatar extends React.Component {
  state = {
    progress: 0,
    state:'normal',
  };

  onChange = async (info) => {
    if (info.file.status === 'uploading') {
      this.state.state = 'progress';
      this.state.progress = Math.round(info.file.percent);
      this.setState({});
    }else if( info.file.status == 'done' ){
      this.state.state = 'normal';
      this.setState({});
      var response = info.file.response;
      try{
        var data = uploadImage.onResponse(response);
        this.props.onChange(response.data);
      }catch(e){
        notification.error({
          message:'上传失败',
          description:e.message
        });
      }
    }else if( info.file.status == 'error' ){
      this.state.state = 'normal';
      this.setState({});
      notification.error({
        message:'上传失败',
        description:'请检查你的网络情况',
      });
    }else{
      throw new Error("未知的上传错误!"+info.file.status);
    }
  }
  customRequest = (option)=>{
    new ImageCompressor(option.file,{
      quality: .8,
      maxWidth:this.props.maxWidth || 1920,
      maxHeight:this.props.maxHeight ||1920,
      success(result) {
        option.file = result;
        customRequest({
          ...option,
          file:result,
        });
      },
      error(e) {
        option.onError(e);
      },
    });
  }
  render() {
    const value = this.props.value;
    const placeholder = this.props.placeholder || '请点击或拖动上传';
    var preview = null;
    if( value && value != ""){
      preview = <div><img className={style.root} src={value}/></div>;
    }else{
      preview = null;
    }
    var info = null;
    if( this.state.state == 'normal' ){
      info = <div>{preview}<div><Icon type="upload" style={{marginRight:'10px'}}/>{placeholder}</div></div>
    }else{
      info = <div>{preview}<div>{'上传中：'+this.state.progress+'%'}</div></div>
    }
    const disabled = this.props.disabled;
    return (
      <div>
        {disabled?(<div>{preview}</div>):<Dragger
          name={uploadImage.name}
          accept="image/*"
          listType="picture"
          showUploadList={false}
          action={uploadImage.action}
          withCredentials={true}
          onChange={this.onChange}
          customRequest={this.customRequest}
        >
         {info}
        </Dragger>}
      </div>
    );
  }
}