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
    private LocalIPService localIPService;

    @PostConstruct
    public void init(){
        System.out.println("---------- getByLocalHost ----------");
        localIPService.getByLocalHost();

        System.out.println("---------- getByNetworkInterface ----------");
        localIPService.getByNetworkInterface();
    }
}
