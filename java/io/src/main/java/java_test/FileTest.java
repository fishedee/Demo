package java_test;

import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class FileTest {

    public void go()throws Exception{
        FileInputStream inFile = null;
        FileOutputStream outFile = null;
        BufferedInputStream bufferedInputStream = null;
        BufferedOutputStream bufferedOutputStream = null;
        try{
            //FileInputStream是对文件的字节流
            inFile = new FileInputStream("a.jpeg");
            outFile = new FileOutputStream("b.jpeg");
            //bufferedInputStream是处理流
            bufferedInputStream = new BufferedInputStream(inFile);
            bufferedOutputStream = new BufferedOutputStream(outFile);
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= bufferedInputStream.read(buffer))!=-1){
                bufferedOutputStream.write(buffer,0,length);
            }
        }finally {
            if( bufferedOutputStream != null){
                bufferedOutputStream.close();
            }
            if( bufferedInputStream != null){
                bufferedInputStream.close();
            }
            if( outFile != null){
                outFile.close();
            }
            if( inFile != null){
                inFile.close();
            }
        }
    }
}
