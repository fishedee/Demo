package java_test;

import com.sun.xml.internal.messaging.saaj.util.ByteInputStream;
import com.sun.xml.internal.messaging.saaj.util.ByteOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class ByteArrayStreamTest {

    public byte[] readToMemory()throws Exception{
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        FileInputStream inFile = null;
        BufferedInputStream bufferedInputStream = null;
        FileOutputStream outFile = null;
        try{
            inFile = new FileInputStream("a.jpeg");
            bufferedInputStream = new BufferedInputStream(inFile);
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= bufferedInputStream.read(buffer))!=-1){
                byteStream.write(buffer,0,length);
            }
            return byteStream.toByteArray();
        }finally {
            if( byteStream!= null ){
                byteStream.close();
            }
            if( bufferedInputStream != null){
                bufferedInputStream.close();
            }
            if( inFile != null){
                inFile.close();
            }
        }
    }

    public void memoryToFile(byte[] memory)throws Exception{
        ByteArrayInputStream byteStream = new ByteArrayInputStream(memory);
        FileOutputStream outFile = null;
        BufferedOutputStream bufferedOutputStream = null;
        try{
            outFile = new FileOutputStream("b2.jpeg");
            bufferedOutputStream = new BufferedOutputStream(outFile);
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= byteStream.read(buffer))!=-1){
                bufferedOutputStream.write(buffer,0,length);
            }
        }finally {
            if( byteStream != null ){
                byteStream.close();
            }
            if( bufferedOutputStream != null){
                bufferedOutputStream.close();
            }
            if( outFile != null){
                outFile.close();
            }
        }
    }

    public void go()throws Exception{
        byte[] memory = this.readToMemory();

        this.memoryToFile(memory);
    }
}
