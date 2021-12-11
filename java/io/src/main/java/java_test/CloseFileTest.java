package java_test;

import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class CloseFileTest {
    private void test1(){
        FileInputStream inFile = null;
        BufferedInputStream bufferedInputStream = null;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try{
            //FileInputStream是对文件的字节流
            inFile = new FileInputStream("a.jpeg");
            //bufferedInputStream是处理流
            bufferedInputStream = new BufferedInputStream(inFile);
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= bufferedInputStream.read(buffer))!=-1){
                byteArrayOutputStream.write(buffer,0,length);
            }
            int allLength = byteArrayOutputStream.toByteArray().length;
            if( allLength != 256272 ){
                throw new RuntimeException("读取错误!");
            }
        }catch(FileNotFoundException e ){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }finally {
            try{
                if( bufferedInputStream != null){
                    bufferedInputStream.close();
                }
                if( inFile != null){
                    inFile.close();
                }
                if( byteArrayOutputStream != null ){
                    byteArrayOutputStream.close();
                }
            }catch(IOException e){
                e.printStackTrace();
            }
        }
    }

    private void test2(){
        FileInputStream inFile = null;
        BufferedInputStream bufferedInputStream = null;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try{
            //FileInputStream是对文件的字节流
            inFile = new FileInputStream("a.jpeg");
            //bufferedInputStream是处理流
            bufferedInputStream = new BufferedInputStream(inFile);
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= bufferedInputStream.read(buffer))!=-1){
                byteArrayOutputStream.write(buffer,0,length);
            }
            if( byteArrayOutputStream.toByteArray().length != 256272){
                throw new RuntimeException("读取错误!");
            }
        }catch(FileNotFoundException e ){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }finally {
            try{
                //在装饰器模式上，外层流关闭，会触发内层流的关闭，不再需要手动关闭内层流
                if( bufferedInputStream != null){
                    bufferedInputStream.close();
                }
                if( byteArrayOutputStream != null ){
                    byteArrayOutputStream.close();
                }
            }catch(IOException e){
                e.printStackTrace();
            }
        }
    }

    private void test3(){
        try(
                BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream("a.jpeg"));
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ){
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= inputStream.read(buffer))!=-1){
                outputStream.write(buffer,0,length);
            }
            if( outputStream.toByteArray().length != 256272){
                throw new RuntimeException("读取错误!");
            }
        }catch(FileNotFoundException e ){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public void go(){
        test1();
        test2();
        test3();
    }
}
