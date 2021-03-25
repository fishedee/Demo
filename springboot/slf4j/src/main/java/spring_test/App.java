package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;

/**
 * Hello world!
 *
 */
@SpringBootApplication
public class App implements ApplicationRunner
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    ServiceA serviceA;

    @Autowired
    ServiceB serviceB;

    public   void run(ApplicationArguments arguments) throws Exception{
        serviceA.go();

        serviceB.go();
    }
}
