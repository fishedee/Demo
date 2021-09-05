package java_test;

import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class FileTest2 {

    public void go()throws Exception{
        //FileReader是默认按系统的默认编码来读取的，Mac是UTF-8编码，在Windows是GBK编码，读取后的结果统一转换为UTF-8编码
        //这个设计显然并不好，在Windows系统中打开UTF-8编码的文件就会乱码，因为Windows系统默认的编码是GBK
        FileReader inFile = null;
        FileWriter outFile = null;
        BufferedReader bufferedReader = null;
        BufferedWriter bufferedWriter = null;
        try{
            //FileInputStream是对文件的字符流
            inFile = new FileReader("utf8.txt");
            outFile = new FileWriter("b.txt");
            //bufferedInputStream是处理字符流
            bufferedReader = new BufferedReader(inFile);
            bufferedWriter = new BufferedWriter(outFile);
            //这是与FileInputStream的区分，处理的是字符，不是字节，所有用char[]，而不是byte[]
            char[] buffer = new char[1024];
            int length = 0;
            while( (length= bufferedReader.read(buffer))!=-1){
                bufferedWriter.write(buffer,0,length);
            }
        }finally {
            if( bufferedWriter != null){
                bufferedWriter.close();
            }
            if( bufferedReader != null){
                bufferedReader.close();
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
