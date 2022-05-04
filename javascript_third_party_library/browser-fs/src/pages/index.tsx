import styles from './index.less';
import {Button,Modal} from 'antd';
import {  fileSave } from 'browser-fs-access';
import { useRef } from 'react';
import axios from 'axios';

const GlobalCatch = async(handler:()=>Promise<void>)=>{
  try{
    await handler();
  }catch(e){
    Modal.error({
      content:'错误:'+e,
    });
  }
}

const imageToBlob = async (img:any):Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      resolve(blob!);
    });
  });
};

export default function IndexPage() {
  const imageRef = useRef<any>();
  const saveImage = async()=>{
    const blob = await imageToBlob(imageRef.current);
    //这个blob可以来自于
    await fileSave(blob, {
      fileName: 'floppy.png',
      extensions: ['.png'],
    });
  }

  const saveResponse = async ()=>{
    const blob = await axios({
      method:'GET',
      url:'/floppy.png',
      responseType:'blob',
    });
    await fileSave(blob.data, {
      fileName: 'floppy_reponse.png',
      extensions: ['.png'],
    });
  }
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <img ref={imageRef} src={'floppy.png'}/>
      <Button onClick={()=>{
        GlobalCatch(saveImage);
      }}>{'保存图片'}</Button>
      <Button onClick={()=>{
        GlobalCatch(saveResponse);
      }}>{'保存Response'}</Button>
    </div>
  );
}
