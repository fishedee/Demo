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
    private EvalTest evalTest;

    @PostConstruct
    public void go(){
        try{
            evalTest.go();
        }catch(Exception e ){
            e.printStackTrace();
        }
    }
}
