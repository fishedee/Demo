package java_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.*;

@Component
@Slf4j
public class FileTest {

    public void go()throws Exception{
        File a = new File("../file/data/a.jpeg");
        log.info("exists {}",a.exists());
        log.info("name {}",a.getName());
        log.info("path {}",a.getPath());
        log.info("absolutePath {}",a.getAbsolutePath());
        log.info("canonicalPath {}",a.getCanonicalPath());//去掉了...的符号
        log.info("isDirectory {}",a.isDirectory());
        log.info("isFile {}",a.isFile());

        File b = new File("data/cc.jpeg");
        if( b.exists() == false ){
            //创建文件
            b.createNewFile();

            //重命名
            b.renameTo(new File("data/c2.jpeg"));
        }
        //删除文件
        new File("data/c2.jpeg").delete();
    }
}
