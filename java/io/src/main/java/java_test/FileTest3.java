package java_test;

import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class FileTest3 {

    public void go()throws Exception{
        //FileReader是默认按系统的默认编码来读取的，Mac是UTF-8编码，在Windows是GBK编码，读取后的结果统一转换为UTF-8编码
        //这个设计显然并不好，在Windows系统中打开UTF-8编码的文件就会乱码，因为Windows系统默认的编码是GBK
        FileInputStream inFile = null;
        FileOutputStream outFile = null;
        BufferedInputStream bufferedInputStream = null;
        BufferedOutputStream bufferedOutputStream = null;
        InputStreamReader reader = null;
        OutputStreamWriter writer = null;
        try{
            //FileInputStream是对文件的字节流
            inFile = new FileInputStream("utf8.txt");
            outFile = new FileOutputStream("gbk.txt");
            //bufferedInputStream是处理字节流
            bufferedInputStream = new BufferedInputStream(inFile);
            bufferedOutputStream = new BufferedOutputStream(outFile);
            //Stream转换为Reader，从字节流转换为字符流
            reader = new InputStreamReader(bufferedInputStream,"UTF-8");
            writer = new OutputStreamWriter(bufferedOutputStream,"GBK");
            //这是与FileInputStream的区分，处理的是字符，不是字节，所有用char[]，而不是byte[]
            char[] buffer = new char[1024];
            int length = 0;
            while( (length= reader.read(buffer))!=-1){
                writer.write(buffer,0,length);
            }
        }finally {
            if( writer != null ){
                writer.close();
            }
            if( reader != null){
                reader.close();
            }
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
