package java_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class App {
    public static void main(String[] args){
        System.out.println("Hello World");
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private FileTest fileTest;

    @Autowired
    private FileTest2 fileTest2;

    @Autowired
    private FileTest3 fileTest3;

    @Autowired
    private ByteArrayStreamTest readToMemoryTest;

    @Autowired
    private ByteBufferTest byteBufferTest;

    @Autowired
    private CloseFileTest closeFileTest;

    @PostConstruct
    public void go(){
        try{
            closeFileTest.go();;
        }catch(Exception e ){
            e.printStackTrace();
        }
    }
}
