package java_test;

import com.oracle.tools.packager.IOUtils;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.StandardOpenOption;

@Component
public class ByteBufferTest {

    public void go()throws Exception {
        FileChannel readChannel = null;
        FileChannel writeChannel = null;
        try {
            readChannel = FileChannel.open(new File("a.jpeg").toPath());
            writeChannel = FileChannel.open(new File("b3.jpeg").toPath(), StandardOpenOption.WRITE , StandardOpenOption.CREATE);
            ByteBuffer byteBuffer = ByteBuffer.allocate(64);
            int length = 0;
            while ((length = readChannel.read(byteBuffer)) != -1) {
                //转换到写模式，从byteBuffer读取数据，写入到文件中
                byteBuffer.flip();
                writeChannel.write(byteBuffer);

                //清空缓冲区，未读未写
                byteBuffer.clear();
            }
        } finally {
            if (readChannel != null) {
                readChannel.close();
            }
            if (writeChannel != null) {
                writeChannel.close();
            }
        }
    }
}
