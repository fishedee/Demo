package java_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.stream.Collectors;

@Component
@Slf4j
public class DirectoryTest {

    public void go()throws Exception{
        File a = new File("../file");
        log.info("exists {}",a.exists());
        log.info("name {}",a.getName());
        log.info("path {}",a.getPath());
        log.info("absolutePath {}",a.getAbsolutePath());
        log.info("canonicalPath {}",a.getCanonicalPath());//去掉了...的符号
        log.info("isDirectory {}",a.isDirectory());
        log.info("isFile {}",a.isFile());

        File[] subFiles = a.listFiles();
        log.info("subFiles {}", Arrays.stream(subFiles).collect(Collectors.toList()));

        File c = new File("data2");
        if( c.exists() == false ){
            //创建文件夹
            c.mkdir();
            //重命名
            c.renameTo(new File("data3"));
        }
        //删除文件夹
        new File("data3").delete();
    }
}
