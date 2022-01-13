package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import javax.annotation.PostConstruct;

/**
 * Hello world!
 *
 */
@EnableScheduling
@SpringBootApplication
@Slf4j
public class App implements CommandLineRunner
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @PostConstruct
    public void init(){
        log.info("after bean init");
    }

    @Override
    public void run(String... args) throws Exception{
        log.info("run!");
    }

}
